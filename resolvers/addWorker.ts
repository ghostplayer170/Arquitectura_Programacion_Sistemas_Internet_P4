// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { Worker } from "../types.ts";
import { WorkerModel, WorkerModelType } from "../db/schemas/worker.ts";

export const addWorker = async (
  req: Request<{}, {}, WorkerModelType>,
  res: Response<Worker | { error: unknown }>,
) => {
  try {
    const { dni, name, email, businessID, tasksIDs } = req.body;
    const Worker = new WorkerModel({
      dni,
      name,
      email,
      businessID,
      tasksIDs,
    });
    await Worker.save();
    res.status(201).json(Worker).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default addWorker;
