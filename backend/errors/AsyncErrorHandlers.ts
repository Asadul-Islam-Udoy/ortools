import {Request,Response,NextFunction} from 'express';
export const AsyncErrorHanler=(fun:(req:Request,res:Response,next:NextFunction)=>Promise<any>)=>(req:Request,res:Response,next:NextFunction)=>{
  Promise.resolve((fun(req,res,next))).catch(next)
}