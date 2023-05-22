import { Router } from "express";
import { TaskService } from "../service/taskService";
import { createRouteHandler } from "../utils/createRouteHandler";

export const appRouter: Router = Router();
const taskService: TaskService = new TaskService();

appRouter
  .get("/tasks", createRouteHandler(taskService.getTasks))
  .post("/tasks", createRouteHandler(taskService.createTask))
  .delete("/tasks/:id", createRouteHandler(taskService.deleteTask))
  .put("/tasks/:id", createRouteHandler(taskService.updateTask))
  .patch("/tasks/:id/:date", createRouteHandler(taskService.updateTaskStatus));
