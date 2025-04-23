"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GlobalErrorHanler = (err, req, res, next) => {
    try {
        console.log(err);
        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map((error) => error.message);
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors, // Send array of validation messages
            });
        }
        if (res.headersSent) {
            next({
                success: false,
                message: err.message
            });
        }
        else {
            if (err.message) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'somthing is wrong'
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'server error' + error
        });
    }
};
exports.default = GlobalErrorHanler;
