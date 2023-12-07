import { BusinessModel } from "../schemas/business.ts";
import { TaskModelType } from "../schemas/task.ts";
import { WorkerModel } from "../schemas/worker.ts";
import { validatorsTask } from "../validators/validatorTask.ts";

export const TaskPostSave = async function (doc: TaskModelType) {
  if (doc.workerID) {
    try {
      await WorkerModel.updateOne(
        { _id: doc.workerID },
        { $push: { tasksIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { tasksIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const TaskPostDelete = async function (doc: TaskModelType) {
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
};
