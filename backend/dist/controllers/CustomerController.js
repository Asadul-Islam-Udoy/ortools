"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCsvFileController = exports.deleteCustomerController = exports.updateCustomerController = exports.getSingleCustomersController = exports.getAllCustomersController = exports.createCustomerController = void 0;
const AsyncErrorHandlers_1 = require("../errors/AsyncErrorHandlers");
const CustomerModel_1 = __importDefault(require("../models/CustomerModel"));
const CustomerTagsModels_1 = __importDefault(require("../models/CustomerTagsModels"));
const fs_1 = __importDefault(require("fs"));
const fast_csv_1 = require("fast-csv");
const sequelize_1 = require("sequelize");
// customer create controller
exports.createCustomerController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingCustomer = yield CustomerModel_1.default.findOne({
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
        const customer = yield CustomerModel_1.default.create({
            name,
            email,
            phone,
            company,
        });
        if (customer) {
            if ((tags === null || tags === void 0 ? void 0 : tags.length) > 0) {
                for (let val of tags) {
                    yield CustomerTagsModels_1.default.create({
                        name: val,
                        customerId: customer.id,
                    });
                }
            }
            return res.status(201).json({
                success: true,
                message: "customer create successfully!",
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "customer create fail!",
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
// customers get all controller
exports.getAllCustomersController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email } = req.query;
    const searchConditions = [];
    if (name) {
        searchConditions.push({ name: { [sequelize_1.Op.iLike]: `%${name}%` } });
    }
    if (phone) {
        searchConditions.push({ phone: { [sequelize_1.Op.iLike]: `%${phone}%` } });
    }
    if (email) {
        searchConditions.push({ email: { [sequelize_1.Op.iLike]: `%${email}%` } });
    }
    const whereClause = searchConditions.length > 0 ? { [sequelize_1.Op.or]: searchConditions } : {};
    const customers = yield CustomerModel_1.default.findAll({
        where: whereClause,
        include: [{ model: CustomerTagsModels_1.default, as: "tags" }],
    });
    console.log('da', customers);
    res.status(200).json({
        success: true,
        message: "Customer updated successfully!",
        data: customers,
    });
}));
// customers get single controller
exports.getSingleCustomersController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customer = yield CustomerModel_1.default.findByPk(id, {
        include: [{ model: CustomerTagsModels_1.default, as: "tags" }],
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
}));
// customer update controller
exports.updateCustomerController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const updateTag = req.body.tags;
    const customer = yield CustomerModel_1.default.findByPk(id);
    if (!customer) {
        return res.status(404).json({
            success: false,
            message: "Customer not found!",
        });
    }
    yield customer.update(updateData);
    if ((updateTag === null || updateTag === void 0 ? void 0 : updateTag.length) > 0) {
        yield CustomerTagsModels_1.default.destroy({
            where: {
                customerId: id,
            },
        });
        for (let val of updateTag) {
            yield CustomerTagsModels_1.default.create({
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
}));
// customer delete controller
exports.deleteCustomerController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customer = yield CustomerModel_1.default.findByPk(id);
    if (!customer) {
        return res.status(404).json({
            success: false,
            message: "Customer not found!",
        });
    }
    yield customer.destroy();
    res.status(200).json({
        success: true,
        message: "Customer delete successfully!",
    });
}));
function processBatch(batch, summary) {
    return __awaiter(this, void 0, void 0, function* () {
        const valid = [];
        for (const row of batch) {
            const { name, email, phone, company } = row;
            if (!name || !email || !phone || !company || !/\S+@\S+\.\S+/.test(email)) {
                summary.failed++;
                summary.errors.push({ row, reason: 'Validation failed' });
                continue;
            }
            const exists = yield CustomerModel_1.default.findOne({ where: { email } });
            if (exists) {
                summary.skipped++;
                continue;
            }
            valid.push({ name, email, phone, company });
        }
        if (valid.length) {
            yield CustomerModel_1.default.bulkCreate(valid);
            summary.inserted += valid.length;
        }
        summary.processed += batch.length;
    });
}
// customers csv file upload controller
exports.uploadCsvFileController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    console.log(req.file);
    const fileRows = [];
    const summary = {
        processed: 0,
        inserted: 0,
        failed: 0,
        skipped: 0,
        errors: []
    };
    const BATCH_SIZE = 1000;
    const filePath = req.file.path;
    const stream = fs_1.default.createReadStream(filePath)
        .pipe((0, fast_csv_1.parse)({ headers: true }))
        .on('data', (row) => {
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
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        if (fileRows.length) {
            yield processBatch(fileRows, summary);
        }
        fs_1.default.unlinkSync(filePath); // Clean up temp file
        res.status(200).json({ success: true, summary });
    }));
}));
