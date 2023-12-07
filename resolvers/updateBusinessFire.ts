import { Request, Response } from "npm:express@4.18.2";
import { BusinessModel } from "../db/schemas/business.ts";
import { Business } from "../types.ts";
import { WorkerModel } from "../db/schemas/worker.ts";
import { fireWorkerMiddleware } from "../db/middlewares/middlewareBusiness.ts";

export const updateBusinessFire = async (
  req: Request<{ id: string, workerId: string }>,
  res: Response<Business | { error: unknown }>,
) => {
  const id = req.params.id;
  const workerId = req.params.workerId;
  try {
    const Worker = await WorkerModel.findById(workerId).exec();
    if(!Worker){
        res.status(404).send({ error: "Worker not found" });
        return;
    }
    const Business = await BusinessModel.findById(id);
    if (Business) {
        // Pasar la instancia de la empresa y el ID del trabajador al middleware
        await fireWorkerMiddleware(Business, workerId); 
    }
    if (!Business) {
      res.status(404).send({ error: "Business not found" });
      return;
    }
    res.status(200).json(Business).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default updateBusinessFire;