import mongoose from "npm:mongoose@7.6.3";
import { Task } from "../../types.ts";
import { State } from "../../types.ts";
import { TaskPostDelete, TaskPostSave } from "../middlewares/middlewareTask.ts";

export type TaskModelType =
  & mongoose.Document
  & Omit<Task, "id" | "worker" | "business">
  & { workerID: mongoose.Types.ObjectId }
  & { businessID: mongoose.Types.ObjectId };

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    description: { type: String, required: true },
    state: { type: String, enum: State, required: false, default: State.ToDo },
    workerID: { type: Schema.Types.ObjectId, required: false, ref: "Worker" },
    businessID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Business",
    },
  },
  { timestamps: true },
);

TaskSchema.post(
  ["save", "findOneAndUpdate", "updateOne"],
  TaskPostSave,
);
TaskSchema.post(["findOneAndDelete"], TaskPostDelete);

export const TaskModel = mongoose.model<TaskModelType>(
  "Task",
  TaskSchema,
);
