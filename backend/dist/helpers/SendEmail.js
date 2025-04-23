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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const UserContractModel_1 = __importDefault(require("../models/UserContractModel"));
// Email sending function using Nodemailer
const sendEmail = (pdfPath, message, res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.SEND_EMAIL, //YOUR-GMAIL-ADDRESS
                pass: process.env.EMAIL_PASSWORD //THE-GOOGLE-APP-PASSWORD
            },
        });
        const mailOptions = {
            from: process.env.SEND_EMAIL,
            to: process.env.RECEVIER_EMAIL,
            subject: "New Form Submission",
            text: "A new form has been submitted. You can download the PDF here:",
            attachments: [
                {
                    filename: path_1.default.basename(pdfPath),
                    path: pdfPath,
                },
            ],
        };
        transporter.sendMail(mailOptions, function (err, info) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                }
                else {
                    yield UserContractModel_1.default.create({
                        user: req.user._id,
                        message: message,
                        pdf_file: path_1.default.basename(pdfPath)
                    });
                    console.log("email verification successfully!");
                }
            });
        });
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: err,
        });
    }
});
exports.sendEmail = sendEmail;
