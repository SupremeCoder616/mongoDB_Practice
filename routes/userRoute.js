import { Router } from "express";
import {
  createUser,
  getUsers,
  getUsersByAggregation,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/aggregation", getUsersByAggregation);
export default userRouter;
