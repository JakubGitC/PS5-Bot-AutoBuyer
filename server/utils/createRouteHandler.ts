import { Request, Response } from "express";
import { TaskInvalidDataError, TaskNotFoundError } from "./Errors";

export const createRouteHandler =
  <T>(serviceMethod: (req: Request, res: Response) => Promise<T>) =>
  async (req: Request, res: Response) => {
    try {
      await serviceMethod(req, res);
    } catch (err: any) {
      if (err instanceof TaskNotFoundError) {
        res.status(err.status).json({ message: err.message });
      } else if (err instanceof TaskInvalidDataError) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Server error." });
      }
    }
  };
