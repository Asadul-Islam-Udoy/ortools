import { AsyncErrorHanler } from "../errors/AsyncErrorHandlers";
import { Request, Response } from "express";
import { Op } from "sequelize";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import GetUserToken from "../tokens/GetUserToken";

// user create controller
export const createUserController = AsyncErrorHanler(
  async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
  
      if (existingUser) {
        return res.status(400).json({
          error: 'Username or email already exists',
        });
      }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
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
    } else {
      res.status(400).json({
        sucess: false,
        message: "user create fail!",
      });
    }
  }
);

///login controller
export const loginUserController = AsyncErrorHanler(
    async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email }});
        if (!user) {
          return res.status(400).json({
            success:false,
            message: ' email is not exists',
          });
        }
      const match = await bcrypt.compare(password,user.password);
      if (!match) {
           return res.status(400).json({
            success:false,
            message: 'incurrent password',
          });
      } else {
        await GetUserToken(user,res,200)
      }
    }
  );

///logout controller
export const logoutUserController = AsyncErrorHanler(
    async (req: Request, res: Response) => {
        res.clearCookie('token',{
            httpOnly:false
          });
          return res.status(200).json({
            success: true,
            message: "logout successfully!",
          });
    }
  );

 ///get all users
  export const getAllUsers = AsyncErrorHanler(
    async (req: Request, res: Response) => {
        const user = await User.findAll();
        return res.status(200).json({
          success: true,
          message: "get all users successfully!",
          user
        });
    }
  );

