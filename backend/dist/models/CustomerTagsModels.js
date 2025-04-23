"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerTag = void 0;
const sequelize_1 = require("sequelize");
const DbConnerction_1 = __importDefault(require("../config/DbConnerction"));
const CustomerModel_1 = __importDefault(require("./CustomerModel"));
class CustomerTag extends sequelize_1.Model {
}
exports.CustomerTag = CustomerTag;
CustomerTag.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "customers",
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: DbConnerction_1.default,
    modelName: "Tag",
    tableName: "tags",
    timestamps: true,
});
CustomerModel_1.default.hasMany(CustomerTag, {
    foreignKey: "customerId",
    as: "tags",
    onDelete: "CASCADE",
    hooks: true,
});
CustomerTag.belongsTo(CustomerModel_1.default, {
    foreignKey: "customerId",
    as: "customer",
});
exports.default = CustomerTag;
