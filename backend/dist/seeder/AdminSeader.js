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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AdminSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAdmin = yield UserModel_1.default.findAll();
        if ((findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.length) <= 0) {
            yield UserModel_1.default.create({
                username: 'AsAdUL kHAan',
                email: 'admin@gmail.com',
                password: yield bcrypt_1.default.hash('123', 10),
                role: 'admin'
            });
            console.log("Admin Seeder data already exists, skipping seed.");
        }
    }
    catch (error) {
        console.error("Error seeding slider data:", error.message);
    }
});
exports.default = AdminSeeder;
