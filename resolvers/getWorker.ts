// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { WorkerModel } from "../db/schemas/worker.ts";
import { Worker } from "../types.ts";

// Esta función maneja una solicitud para agregar un nuevo Worker.
export const getWorker = async (
  req: Request<{ id: string }>,
  res: Response<Worker | { error: unknown }>,
) => {
  const id = req.params.id;
  try {
    const worker = await WorkerModel.findById(id)
    .populate("business")
    .populate("tasks")
    .exec();
    if (!worker) {
      res.status(404).send({ error: "Worker not found" });
      return;
    }
    res.status(200).json(worker).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getWorker;