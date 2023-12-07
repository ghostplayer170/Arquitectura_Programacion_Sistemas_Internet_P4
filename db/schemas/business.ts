import mongoose from "npm:mongoose@7.6.3";
import { Business } from "../../types.ts";
import { BusinessPostDelete, BusinessPostSave } from "../middlewares/middlewareBusiness.ts";

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

BusinessSchema.post(
  ["save", "findOneAndUpdate", "updateOne"],
  BusinessPostSave,
);
BusinessSchema.post(["findOneAndDelete"], BusinessPostDelete);

// Validar que todas las tareas con los IDs dados existen
BusinessSchema.path("tasksIDs").validate(async function (
  tasksIDs: mongoose.Types.ObjectId[],
) {
  // Verifica si ha cambiado las tasksIDs
  if (JSON.stringify(tasksIDs) === JSON.stringify(this.tasksIDs)) {
    return true;
  }
  try {
    const tasksCount = await mongoose.models.Task.countDocuments({
      _id: { $in: tasksIDs },
    });
    if (tasksCount !== tasksIDs.length) {
      throw new Error(`Tasks id founded ${tasksCount}, some Tasks not exists`);
    }
    return true;
  } catch (_e) {
    return false;
  }
});

// Validar que todas los trabajadores con los IDs dados existen y que el número total no excede 10
BusinessSchema.path("workersIDs").validate(async function (
  workersIDs: mongoose.Types.ObjectId[],
) {
  // Verifica si han cambiado las workersIDs
  if (JSON.stringify(workersIDs) === JSON.stringify(this.workersIDs)) {
    return true;
  }
  try {
    const workersCount = await mongoose.models.Worker.countDocuments({
      _id: { $in: workersIDs },
    });
    if (workersCount !== workersIDs.length) {
      throw new Error("Some workers do not exist");
    }
    if (workersCount > 10) {
      throw new Error("Business can only have a maximum of 10 workers");
    }
    return true;
  } catch (_e) {
    return false;
  }
});

export const BusinessModel = mongoose.model<BusinessModelType>(
  "Business",
  BusinessSchema,
);
