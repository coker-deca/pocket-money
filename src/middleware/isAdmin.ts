import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function adminAuthorization(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token: any = req.headers["authorization"]?.split(" ")[1];
    console.log( "admin middleware header",req.headers["authorization"])
    jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`, (err: any, user: any)=>{
       console.log("error from admin header",err)
        if(err) return res.status(403).json({ err });
       console.log(user)
       if(user &&  user["is_admin"]){
        //req.user = user;
        next();
        return;
       }
      return res.status(403).json({ error: "sorry you don't have authorization" });
    })
    
  } catch (error) {
    res.status(400).json({
      data: {
        result: "",
        error: "sorry you don't have authorization",
      },
    });
  }
}
