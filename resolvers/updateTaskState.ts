import { Request, Response } from "npm:express@4.18.2";
import { State, Task } from "../types.ts";
import { TaskModel } from "../db/schemas/task.ts";

export const updateTaskState = async (
  req: Request,
  res: Response<Task | { error: unknown }>,
) => {
  const id = req.params.id; // El parámetro obligatorio :id
  const newStatus = req.query.status; // El parámetro opcional status obtenido de la query
  try {
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { state: newStatus },
      { new: true },
    );
    if (!task) {
      res.status(404).send({ error: "Task not found" });
      return;
    }
    await task.save();
    if (newStatus !== State.Closed) {
      res.status(200).json(task).send();
    } else {
      res.status(200).send("Task deleted, because state equals to Closed");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default updateTaskState;
