import mongoose from "npm:mongoose@7.6.3";
import { Task } from "../../types.ts";
import { State } from "../../types.ts";
import { TaskPostDelete, TaskPostSave } from "../middlewares/middlewareTask.ts";
import { WorkerModel } from "./worker.ts";
import { BusinessModel } from "./business.ts";

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

TaskSchema.post(["save"], TaskPostSave);
TaskSchema.post(["findOneAndDelete"], TaskPostDelete);
TaskSchema.pre("save", async function (next) {
  const doc = this as unknown as TaskModelType;
  if (doc.state === State.Closed) {
    try {
      // Encuentra y elimina todas las referencias antes de eliminar la tarea
      if (doc.workerID) {
        try {
          await WorkerModel.updateOne(
            { _id: doc.workerID },
            { $pull: { tasksIDs: doc._id } },
          );
        } catch (_e) {
          console.log(_e);
        }
      }
      if (doc.businessID) {
        try {
          await BusinessModel.updateOne(
            { _id: doc.businessID },
            { $pull: { tasksIDs: doc._id } },
          );
        } catch (_e) {
          console.log(_e);
        }
      }
      // Continúa con la eliminación de la tarea una vez que se hayan eliminado las referencias
      await TaskModel.findByIdAndDelete(doc._id);

      // Termina el middleware sin continuar con la actualización estándar de Mongoose
      next(false);
    } catch (error) {
      // Manejo de errores
      console.error(error);
      throw new Error("Error al eliminar la tarea y sus referencias");
    }
  } else {
    // Continuar con la actualización estándar de Mongoose si no es un estado "Closed"
    next();
  }
});

export const TaskModel = mongoose.model<TaskModelType>(
  "Task",
  TaskSchema,
);
