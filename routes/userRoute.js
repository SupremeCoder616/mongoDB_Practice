import { Router } from "express";
import {
  createUser,
  getUsers,
  getUsersByAggregation,
  getGroupedUsersByAggregation,
  getProjectedUsersByAggregation,
  getFullPipelineUsersByAggregation,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getUsers);
userRouter.get("/aggregation/match", getUsersByAggregation);
userRouter.get("/aggregation/grouped", getGroupedUsersByAggregation);
userRouter.get("/aggregation/projected", getProjectedUsersByAggregation);
userRouter.get("/aggregation/full-pipeline", getFullPipelineUsersByAggregation);
export default userRouter;
