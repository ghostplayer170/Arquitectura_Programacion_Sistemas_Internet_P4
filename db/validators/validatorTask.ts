import mongoose from "npm:mongoose@7.6.3";
import { TaskModel } from "../schemas/task.ts";

// Validar que el workerID exists
TaskModel.schema.path("workerID").validate(async function (
  value: mongoose.Types.ObjectId,
) {
  // Verifica si ha cambiado el workerID
  if (value === this.workerID) {
    return true;
  }
  try {
    const worker = await mongoose.models.Worker.findById(value);
    if (!worker) {
      throw new Error(`Worker with id ${value} does not exist`);
    }
    return true;
  } catch (_e) {
    return false;
  }
});

// Validar que el businessID exists
TaskModel.schema.path("businessID").validate(async function (
  value: mongoose.Types.ObjectId,
) {
  // Verifica si ha cambiado el businessID
  if (value === this.businessID) {
    return true;
  }
  try {
    const business = await mongoose.models.Business.findById(value);
    if (!business) {
      throw new Error(`Business with id ${value} does not exist`);
    }
    return true;
  } catch (_e) {
    return false;
  }
});
