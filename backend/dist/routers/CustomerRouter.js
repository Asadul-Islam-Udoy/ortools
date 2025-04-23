"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const CustomerController_1 = require("../controllers/CustomerController");
const UserMiddleware_1 = require("../middleware/UserMiddleware");
const router = express_1.default.Router();
router.post("/create", UserMiddleware_1.AdminMiddleware, CustomerController_1.createCustomerController);
router.post("/upload/csv_file", UserMiddleware_1.AdminMiddleware, upload.single('file'), CustomerController_1.uploadCsvFileController);
router.get("/get/all/customers", CustomerController_1.getAllCustomersController);
router.get("/get/single/customer/:id", CustomerController_1.getSingleCustomersController);
router.put("/update/customer/:id", UserMiddleware_1.AdminMiddleware, CustomerController_1.updateCustomerController);
router.delete("/delete/customer/:id", UserMiddleware_1.AdminMiddleware, CustomerController_1.deleteCustomerController);
exports.default = router;
