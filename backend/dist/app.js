"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const GlobalErrorHandler_1 = __importDefault(require("./errors/GlobalErrorHandler"));
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const CustomerRouter_1 = __importDefault(require("./routers/CustomerRouter"));
/// create object
const app = (0, express_1.default)();
///access .env file path
dotenv_1.default.config({ path: '.env' });
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL // Use domain from .env in production
        : 'http://localhost:3000', // The frontend URL
    credentials: true, // Allow sending cookies with cross-origin requests
};
//file middleware
app.use('/images', express_1.default.static(path_1.default.join(__dirname, './public/images')));
///middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
///custom hanlers
app.use(GlobalErrorHandler_1.default);
///session store middleware
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.SESSION_SECRET || "your-secret-key"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
///router middleware
app.use('/api/users', UserRouter_1.default);
app.use('/api/customers', CustomerRouter_1.default);
//run project same url
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, '../client/build/index.html'));
});
exports.default = app;
