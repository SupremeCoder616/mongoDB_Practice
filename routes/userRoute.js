import { Router } from "express";
import { createUser, getUsers } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);

export default userRouter;
