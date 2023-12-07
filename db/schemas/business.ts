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
);

BusinessSchema.post("save", BusinessPostSave);
BusinessSchema.pre("save", async function (next) {
  const doc = this as unknown as BusinessModelType;// El documento actual que se va a guardar
  try {
    if (doc.isModified("workersIDs") && doc.workersIDs.length) {
      // Encuentra todos los workers cuyos IDs no estén en la lista doc.workersIDs
      await mongoose.models.Worker.updateMany(
        { _id: { $nin: doc.workersIDs }, businessID: doc._id },
        { $set: { businessID: null } }, // Establece el campo businessID a null
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});
BusinessSchema.post("findOneAndDelete", BusinessPostDelete);

export const BusinessModel = mongoose.model<BusinessModelType>(
  "Business",
  BusinessSchema,
);
