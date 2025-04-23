import { Request,NextFunction ,Response} from "express";
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import { AsyncErrorHanler } from "../errors/AsyncErrorHandlers";

export const AdminMiddleware=AsyncErrorHanler(async(req:any,res:Response,next:NextFunction):Promise<any>=>{
    const {token} = req.cookies;
   if(!token){
    return res.status(400).json({
        success:false,
        message:'user token is not define!'
    })
   }
   const deCode:any = await jwt.verify(token,process.env.SCRET_KEY!);
   req.user = await User.findByPk(deCode.id);
   next()
})
