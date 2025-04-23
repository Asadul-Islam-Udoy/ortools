"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const DbConnerction_1 = require("./config/DbConnerction");
//datatase connection
(0, DbConnerction_1.DbConnection)();
///server connection
const PORT = process.env.PORT || 4000;
app_1.default.listen(PORT, () => {
    console.log(`server running http://localhost:${PORT}`);
});
