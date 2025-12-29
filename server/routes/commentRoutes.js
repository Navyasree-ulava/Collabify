import express from "express";
import { addCommment, getTaskComments } from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/", addCommment);
commentRouter.get("/:taskId", getTaskComments);

export default commentRouter;
