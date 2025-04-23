import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/DbConnerction";
import Customer from "./CustomerModel";
export interface TagAttributes {
  id?: number;
  name: string;
  customerId: number; // FK to User
}

export interface TagCreationAttributes extends Optional<TagAttributes, "id"> {}

export class CustomerTag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  public id!: number;
  public name!: string;
  public customerId!: number;
}

CustomerTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamps: true,
  }
);
Customer.hasMany(CustomerTag, {
  foreignKey: "customerId",
  as: "tags",
  onDelete: "CASCADE",
  hooks: true,
});

CustomerTag.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});
export default CustomerTag;
