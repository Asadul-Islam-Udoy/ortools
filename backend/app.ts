import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import session from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import GlobalErrorHanler from './errors/GlobalErrorHandler';
import UserRouter from "./routers/UserRouter";
import CustomerRouter from "./routers/CustomerRouter";

/// create object
const app = express();


///access .env file path
dotenv.config({path:'.env'});
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL  // Use domain from .env in production
    : 'http://localhost:3000', // The frontend URL
    credentials: true, // Allow sending cookies with cross-origin requests
}
               
//file middleware
app.use('/images', express.static(path.join(__dirname, './public/images')));

///middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors(corsOptions));
///custom hanlers
app.use(GlobalErrorHanler);

///session store middleware
app.use(
    session({
      name: "session",
      keys: [process.env.SESSION_SECRET || "your-secret-key"],
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());

///router middleware
app.use('/api/users',UserRouter);
app.use('/api/customers',CustomerRouter);

//run project same url
app.use(express.static(path.join(__dirname,'../client/build')));
app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname,'../client/build/index.html'))
 })
export default app;