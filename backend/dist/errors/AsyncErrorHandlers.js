"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncErrorHanler = void 0;
const AsyncErrorHanler = (fun) => (req, res, next) => {
    Promise.resolve((fun(req, res, next))).catch(next);
};
exports.AsyncErrorHanler = AsyncErrorHanler;
