// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
// Esta función maneja una solicitud para agregar un nuevo Task.
import { TaskModel } from "../db/schemas/task.ts";

export const deleteTask = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  const id = req.params.id;
  const Task = await TaskModel.findByIdAndDelete(id).exec();
  if (!Task) {
    res.status(404).send({ error: "Task not found" });
    return;
  }
  res.status(200).send("Task deleted");
};

export default deleteTask;
