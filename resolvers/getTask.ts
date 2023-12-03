// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { TaskModel } from "../db/schemas/task.ts";
import { Task } from "../types.ts";

// Esta función maneja una solicitud para agregar un nuevo Task.
export const getTask = async (
  req: Request<{ id: string }>,
  res: Response<Task | { error: unknown }>,
) => {
  const id = req.params.id;
  try {
    const Task = await TaskModel.findById(id).exec();
    if (!Task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }
    res.status(200).json(Task).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getTask;