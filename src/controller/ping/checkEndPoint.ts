import { Request, Response } from "express";

const ping = async(_req: Request, res: Response) => {

  res.status(200).json({message:"i am up and runing"})

};

export default ping;