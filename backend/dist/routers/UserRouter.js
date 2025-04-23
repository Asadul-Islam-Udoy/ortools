"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.post("/create", UserController_1.createUserController);
router.post("/login", UserController_1.loginUserController);
router.get("/logout", UserController_1.logoutUserController);
router.get("/get", UserController_1.getAllUsers);
exports.default = router;
