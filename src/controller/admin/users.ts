import { Request, Response } from "express";
import { getAllUsers } from "../../services/userService"


const users = async(_req: Request, res: Response) => {
  try {
    const allUsers =await getAllUsers();
    res.status(200).json({ data: allUsers });
    return;
  } catch (error) {
    res.status(200).json({ message: error.message });
    return;
  }

};

export default users;