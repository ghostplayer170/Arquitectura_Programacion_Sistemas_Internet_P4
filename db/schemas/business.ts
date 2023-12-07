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
  ["save"],
  BusinessPostSave,
);
BusinessSchema.post(
  ["findOneAndUpdate"],
  BusinessPostSave,
);
BusinessSchema.post(["findOneAndDelete"], BusinessPostDelete);

export const BusinessModel = mongoose.model<BusinessModelType>(
  "Business",
  BusinessSchema,
);
