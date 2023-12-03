// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { WorkerModel } from "../db/schemas/worker.ts";
import { Worker } from "../types.ts";

// Esta función maneja una solicitud para agregar un nuevo Worker.
export const getAllWorker = async (
  req: Request,
  res: Response<Worker[] | { error: unknown }>,
) => {
  try {
    const Worker = await WorkerModel.find({}).exec();
    if (!Worker) {
      res.status(404).send({ error: "Worker not found" });
      return;
    }
    res.status(200).json(Worker).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getAllWorker;
