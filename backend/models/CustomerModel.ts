import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/DbConnerction";

export interface CustomerAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company: string;
}
export interface UserCreationAttributes
  extends Optional<CustomerAttributes, "id"> {}

export class Customer
  extends Model<CustomerAttributes, UserCreationAttributes>
  implements CustomerAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public company!: string;
}
Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: true,
  }
);

export default Customer;
