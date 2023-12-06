// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { Task } from "../types.ts";
import { TaskModel, TaskModelType } from "../db/schemas/task.ts";

export const addTask = async (
  req: Request<{}, {}, TaskModelType>,
  res: Response<Task | { error: unknown }>,
) => {
  try {
    const { name, description, state, workerID, businessID } = req.body;
    const Task = new TaskModel({
      name,
      description,
      state,
      workerID,
      businessID,
    });
    await Task.save();
    res.status(200).json(Task).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default addTask;
