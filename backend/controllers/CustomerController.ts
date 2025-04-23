import { AsyncErrorHanler } from "../errors/AsyncErrorHandlers";
import { Request, Response } from "express";
import Customer from "../models/CustomerModel";
import CustomerTag from "../models/CustomerTagsModels";
import fs from 'fs';
import {parse} from 'fast-csv';
import { Op } from "sequelize";
// customer create controller
export const createCustomerController = AsyncErrorHanler(
  async (req: Request, res: Response) => {
    try {
      const { name, email, phone, company, tags } = req.body;
      if (!name || !email || !phone || !company) {
        return res.status(400).json({
          success: false,
          message: "field is required!",
        });
      }
      const isEmail = /\S+@\S+\.\S+/.test(email);
      if (!isEmail) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
      }
      const existingCustomer = await Customer.findOne({
        where: {
          email,
        },
      });
      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          message: "email is already exists",
        });
      }
      const customer = await Customer.create({
        name,
        email,
        phone,
        company,
      });
      if (customer) {
        if (tags?.length > 0) {
          for (let val of tags) {
            await CustomerTag.create({
              name: val,
              customerId: customer.id,
            });
          }
        }
        return res.status(201).json({
          success: true,
          message: "customer create successfully!",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "customer create fail!",
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  }
);
// customers get all controller
export const getAllCustomersController = AsyncErrorHanler(
  async (req: Request, res: Response) => {
    const { name, phone, email } = req.query;
   

    const searchConditions: any[] = [];

if (name) {
  searchConditions.push({ name: { [Op.iLike]: `%${name}%` } });
}
if (phone) {
  searchConditions.push({ phone: { [Op.iLike]: `%${phone}%` } });
}
if (email) {
  searchConditions.push({ email: { [Op.iLike]: `%${email}%` } });
}

const whereClause = searchConditions.length > 0 ? { [Op.or]: searchConditions } : {};

    const customers = await Customer.findAll({
      where: whereClause,
      include: [{ model: CustomerTag, as: "tags" }],
    });
    console.log('da',customers)
    res.status(200).json({
      success: true,
      message: "Customer updated successfully!",
      data: customers,
    });
  }
);

// customers get single controller
export const getSingleCustomersController = AsyncErrorHanler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      include: [{ model: CustomerTag, as: "tags" }],
    });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Customer updated successfully!",
      data: customer,
    });
  }
);

// customer update controller
export const updateCustomerController = AsyncErrorHanler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const updateTag = req.body.tags;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found!",
      });
    }
    await customer.update(updateData);
    if (updateTag?.length > 0) {
      await CustomerTag.destroy({
        where: {
          customerId: id,
        },
      });
      for (let val of updateTag) {
        await CustomerTag.create({
          name: val,
          customerId: customer.id,
        });
      }
    }
    res.status(200).json({
      success: true,
      message: "Customer updated successfully!",
      data: customer,
    });
  }
);

// customer delete controller
export const deleteCustomerController = AsyncErrorHanler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found!",
      });
    }
    await customer.destroy();
    res.status(200).json({
      success: true,
      message: "Customer delete successfully!",
    });
  }
);


interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

interface CsvRow {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface Summary {
  processed: number;
  inserted: number;
  failed: number;
  skipped: number;
  errors: { row: CsvRow; reason: string }[];
}

async function processBatch(batch: CsvRow[], summary: Summary): Promise<void> {
  const valid: CsvRow[] = [];

  for (const row of batch) {
    const { name, email, phone, company } = row;

    if (!name || !email || !phone || !company || !/\S+@\S+\.\S+/.test(email)) {
      summary.failed++;
      summary.errors.push({ row, reason: 'Validation failed' });
      continue;
    }

    const exists = await Customer.findOne({ where: { email } });
    if (exists) {
      summary.skipped++;
      continue;
    }

    valid.push({ name, email, phone, company });
  }

  if (valid.length) {
    await Customer.bulkCreate(valid);
    summary.inserted += valid.length;
  }

  summary.processed += batch.length;
}

// customers csv file upload controller

export const uploadCsvFileController = AsyncErrorHanler(
  async (req: MulterRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    console.log(req.file)
    const fileRows: CsvRow[] = [];
    const summary: Summary = {
      processed: 0,
      inserted: 0,
      failed: 0,
      skipped: 0,
      errors: []
    };

    const BATCH_SIZE = 1000;
    const filePath = req.file.path;
    const stream = fs.createReadStream(filePath)
      .pipe(parse<CsvRow, CsvRow>({ headers: true }))
      .on('data', (row: CsvRow) => {
        fileRows.push(row);

        if (fileRows.length >= BATCH_SIZE) {
          stream.pause();
          processBatch(fileRows.splice(0, BATCH_SIZE), summary)
            .then(() => stream.resume())
            .catch((err) => {
              summary.errors.push({ row, reason: `Batch processing error: ${err.message}` });
              stream.resume();
            });
        }
      })
      .on('end', async () => {
        if (fileRows.length) {
          await processBatch(fileRows, summary);
        }

        fs.unlinkSync(filePath); // Clean up temp file
        res.status(200).json({ success: true, summary });
      });
  }
);

