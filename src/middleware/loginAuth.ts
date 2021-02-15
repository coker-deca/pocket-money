import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function loginAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token: any = req.headers["authorization"]?.split(" ")[1];
     console.log("user middlewaare header",token)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, _user: any)=>{
      console.log("error from User header",err)
       if(err) return res.status(403).json({ err });
      next();
      return;
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
