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
exports.getAllUsers = exports.logoutUserController = exports.loginUserController = exports.createUserController = void 0;
const AsyncErrorHandlers_1 = require("../errors/AsyncErrorHandlers");
const sequelize_1 = require("sequelize");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const GetUserToken_1 = __importDefault(require("../tokens/GetUserToken"));
// user create controller
exports.createUserController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    const existingUser = yield UserModel_1.default.findOne({
        where: {
            [sequelize_1.Op.or]: [{ username }, { email }],
        },
    });
    if (existingUser) {
        return res.status(400).json({
            error: 'Username or email already exists',
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield UserModel_1.default.create({
        username,
        email,
        password: hashedPassword,
        role,
    });
    if (user) {
        res.status(201).json({
            sucess: true,
            message: "user create successfully!",
        });
    }
    else {
        res.status(400).json({
            sucess: false,
            message: "user create fail!",
        });
    }
}));
///login controller
exports.loginUserController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield UserModel_1.default.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: ' email is not exists',
        });
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        return res.status(400).json({
            success: false,
            message: 'incurrent password',
        });
    }
    else {
        yield (0, GetUserToken_1.default)(user, res, 200);
    }
}));
///logout controller
exports.logoutUserController = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('token', {
        httpOnly: false
    });
    return res.status(200).json({
        success: true,
        message: "logout successfully!",
    });
}));
///get all users
exports.getAllUsers = (0, AsyncErrorHandlers_1.AsyncErrorHanler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findAll();
    return res.status(200).json({
        success: true,
        message: "get all users successfully!",
        user
    });
}));
