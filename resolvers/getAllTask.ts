// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { TaskModel } from "../db/schemas/task.ts";
import { Task } from "../types.ts";

export const getAllTask = async (
  req: Request,
  res: Response<Task[] | { error: unknown }>,
) => {
  try {
    const Task = await TaskModel.find({})
    .populate({ path: 'workerID'})
    .populate({ path: 'businessID'})
    .exec();
    if (!Task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }
    res.status(200).json(Task).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getAllTask;
