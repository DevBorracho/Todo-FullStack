import { Router } from "express";
import {
  getTasksController,
  postTaskController,
  deleteTaskController,
} from "../controllers/tasks.js";

const router = Router();

router.get("/tasks", getTasksController);
router.post("/tasks", postTaskController);
router.delete("/tasks/:id", deleteTaskController);

export default router;
