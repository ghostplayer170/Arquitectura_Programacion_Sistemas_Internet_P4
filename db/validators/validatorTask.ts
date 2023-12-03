import mongoose from "npm:mongoose@7.6.3";
import { WorkerModel } from "../schemas/worker.ts";
import { BusinessModel } from "../schemas/business.ts";

// Validate that a Worker with the given ID exists in the database
const workerExists = async (
  workerID: mongoose.Types.ObjectId,
): Promise<boolean> => {
  try {
    const worker = await WorkerModel.findById(workerID);
    return !!worker; // Convertir el resultado a un booleano (true si el trabajador existe, false si no)
  } catch (_e) {
    return false;
  }
};

// Validate that a business with the given ID exists in the database
const businessExists = async (
  businessID: mongoose.Types.ObjectId,
): Promise<boolean> => {
  try {
    const business = await BusinessModel.findById(businessID);
    return !!business; // Convertir el resultado a un booleano
  } catch (_e) {
    return false;
  }
};

export const validatorsTask = {
  workerExists,
  businessExists,
};
