import mongoose from "npm:mongoose@7.6.3";
import { Worker } from "../../types.ts";

export type WorkerModelType =
  & mongoose.Document
  & Omit<Worker, "id" | "tasks" | "business">
  & { tasksIDs: Array<mongoose.Types.ObjectId> }
  & { businessID: mongoose.Types.ObjectId };

const Schema = mongoose.Schema;

const WorkerSchema = new Schema(
  {
    dni: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    businessID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Business",
    },
    tasksIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Task" },
    ],
  },
  { timestamps: true },
);

/*
WorkerSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

// on delete: update related documents
WorkerSchema.post("deleteOne", WorkerPostDelete);
*/

export const WorkerModel = mongoose.model<WorkerModelType>(
  "Worker",
  WorkerSchema,
);
