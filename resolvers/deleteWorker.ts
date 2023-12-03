// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
// Esta función maneja una solicitud para agregar un nuevo Worker.
import { WorkerModel } from "../db/schemas/worker.ts";

export const deleteWorker = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  const id = req.params.id;
  const Worker = await WorkerModel.findByIdAndDelete(id).exec();
  if (!Worker) {
    res.status(404).send({ error: "Worker not found" });
    return;
  }
  res.status(200).send("Worker deleted");
};

export default deleteWorker;
