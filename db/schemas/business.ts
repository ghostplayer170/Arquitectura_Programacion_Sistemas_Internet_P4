import mongoose from "npm:mongoose@7.6.3";
import { Business } from "../../types.ts";

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

/*
BusinessSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

// on delete: update related documents
BusinessSchema.post("deleteOne", BusinessPostDelete);
*/

export const BusinessModel = mongoose.model<BusinessModelType>(
  "Business",
  BusinessSchema,
);
