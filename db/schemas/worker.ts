import mongoose from "npm:mongoose@7.6.3";
import { Worker } from "../../types.ts";
import { WorkerPostDelete, WorkerPostSave } from "../middlewares/middlewareWorker.ts";

export type WorkerModelType =
  & mongoose.Document
  & Omit<Worker, "id" | "tasks" | "business">
  & { tasksIDs: Array<mongoose.Types.ObjectId> }
  & { businessID: mongoose.Types.ObjectId };

const Schema = mongoose.Schema;

const WorkerSchema = new Schema(
  {
    dni: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    businessID: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Business",
    },
    tasksIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Task" },
    ],
  },
);

WorkerSchema.post(
  ["save", "findOneAndUpdate", "updateOne"],
  WorkerPostSave,
);
WorkerSchema.post(["findOneAndDelete"], WorkerPostDelete);

// Valida si el correo electrónico tiene el formato *@*.*
WorkerSchema.path("email").validate(async function (
  email: string,
) {
  // Verifica si ha cambiado el email
  if (email === this.email) {
    return true;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    throw new Error(`Email has to be like this: \"name@domain.es\" or \"name123@business.com\"`);
  }
  return true;
});

// Validar que todas las tareas con los IDs dados existen
WorkerSchema.path("tasksIDs").validate(async function (
  tasksIDs: mongoose.Types.ObjectId[],
) {
  // Verifica si ha cambiado las tasksIDs
  if (tasksIDs === this.tasksIDs) {
    return true;
  }
  try {
    const tasksCount = await mongoose.models.Task.countDocuments({
      _id: { $in: tasksIDs },
    });
    if (tasksCount !== tasksIDs.length) {
      throw new Error(`Tasks id founded ${tasksCount}, some Tasks not exists`);
    }
    if (tasksCount > 10) {
      throw new Error("Worker can only have a maximum of 10 taks");
    }
    return true;
  } catch (_e) {
    return false;
  }
});

// Validar que el businessID exists
WorkerSchema.path("businessID").validate(async function (
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

export const WorkerModel = mongoose.model<WorkerModelType>(
  "Worker",
  WorkerSchema,
);
