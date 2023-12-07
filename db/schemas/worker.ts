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
  ["save"],
  WorkerPostSave,
);
WorkerSchema.post(["findOneAndDelete"], WorkerPostDelete);

export const WorkerModel = mongoose.model<WorkerModelType>(
  "Worker",
  WorkerSchema,
);
