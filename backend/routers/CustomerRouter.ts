import express from "express";
import multer from 'multer';


const upload = multer({ dest: 'uploads/' });
import {
  createCustomerController,
  getAllCustomersController,
  getSingleCustomersController,
  updateCustomerController,
  deleteCustomerController,
  uploadCsvFileController,
} from "../controllers/CustomerController";
import { AdminMiddleware } from "../middleware/UserMiddleware";

const router = express.Router();
router.post("/create", AdminMiddleware,createCustomerController);
router.post("/upload/csv_file",AdminMiddleware,upload.single('file'), uploadCsvFileController);
router.get("/get/all/customers", getAllCustomersController);
router.get("/get/single/customer/:id", getSingleCustomersController);
router.put("/update/customer/:id", AdminMiddleware,updateCustomerController);
router.delete("/delete/customer/:id", AdminMiddleware,deleteCustomerController);

export default router;
