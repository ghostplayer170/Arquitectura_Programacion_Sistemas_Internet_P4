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
    workerID: { type: Schema.Types.ObjectId, required: true, ref: "Worker" },
    businessID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Business",
    },
  },
);

TaskSchema.post(
  ["save", "findOneAndUpdate", "updateOne"],
  TaskPostSave,
);
TaskSchema.post(["findOneAndDelete"], TaskPostDelete);

TaskSchema.pre(["save", "findOneAndUpdate", "updateOne"], function (next) {
  const doc = this as unknown as TaskModelType;
  if (!Object.values(State).includes(doc.state as State)) {
    throw new Error("Invalid status provided");
  }
  next();
});

export const TaskModel = mongoose.model<TaskModelType>(
  "Task",
  TaskSchema,
);
