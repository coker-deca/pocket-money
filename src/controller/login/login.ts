
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../../services/userService";
import bcrypt from "bcrypt";

const login = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    try {
      console.log("i am in");
      const {email, password} = req.body

      if(email && password){
        console.log("before query");
        console.log("my payload ", {email:email, password:password});
        const user: any = await getUserByEmail(email);
        console.log("after query", user);
        if (!user) return res.status(404).send('No user found.');
        
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(400).send({ auth: false, token: null });
        const user1 ={
          created: user.created_at,
          id: user.id,
          email: user.email,
          name: user.name,
          is_admin: user.is_admin,
          user_type: user.user_type
        }
        var token = jwt.sign(user1, process.env.ACCESS_TOKEN_SECRET!, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.cookie("user", token);
        return res.status(200).json({
          token: token
           });
       
      }else{
        return res.status(400).send('invalid input.');
      }
    }catch(err){

      return res.status(500).send('something went wrong.');
        
    }  

};

export default login;