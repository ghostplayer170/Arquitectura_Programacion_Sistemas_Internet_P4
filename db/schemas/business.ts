import mongoose from "npm:mongoose@7.6.3";
import { Business } from "../../types.ts";
import {
  BusinessPostDelete,
  BusinessPostSave,
} from "../middlewares/middlewareBusiness.ts";

export type BusinessModelType =
  & mongoose.Document
  & Omit<Business, "id" | "tasks" | "workers">
  & { tasksIDs: Array<mongoose.Types.ObjectId> }
  & { workersIDs: Array<mongoose.Types.ObjectId> };

const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
  {
    name: { type: String, required: true },
    workersIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Worker" },
    ],
    tasksIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Task" },
    ],
  },
  { timestamps: true },
);

BusinessSchema.post(
  ["save", "findOneAndUpdate", "updateOne"],
  BusinessPostSave,
);
BusinessSchema.post(["findOneAndDelete"], BusinessPostDelete);

BusinessSchema.pre("save", async function (next) {
  const doc = this as BusinessModelType; // Acceder al documento que se va a guardar
  try {
    const existingBusiness = await BusinessModel.findOne({ name: doc.name });
    if (existingBusiness) {
      const error = new Error("Ya existe una empresa con este nombre");
      return next(error); // Llamada a next() con un error para detener la operación de guardado
    }
    // Si pasa la verificación, continúa con el guardado
    next();
  } catch (error) {
    next(error); // Manejo de errores
  }
});

export const BusinessModel = mongoose.model<BusinessModelType>(
  "Business",
  BusinessSchema,
);
