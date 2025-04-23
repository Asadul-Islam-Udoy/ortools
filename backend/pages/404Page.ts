import {Request, Response,NextFunction } from "express"

const Page404 = (req:Request,res:Response,next:NextFunction)=>{
    res.send('<h1>404 Errors</h1>') 
}

export default Page404;