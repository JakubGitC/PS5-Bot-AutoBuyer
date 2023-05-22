export class TaskInvalidDataError extends Error {
  status: number;
  constructor() {
    super("Invalid task data.");
    this.status = 400;
  }
}
export class TaskNotFoundError extends Error {
  status: number;
  constructor() {
    super("Task not found.");
    this.status = 404;
  }
}
