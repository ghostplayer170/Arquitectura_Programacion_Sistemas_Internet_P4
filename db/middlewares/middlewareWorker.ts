import { BusinessModel } from "../schemas/business.ts";
import { TaskModel } from "../schemas/task.ts";
import { WorkerModelType } from "../schemas/worker.ts";

export const WorkerPostSave = async function (doc: WorkerModelType) {
  if (doc.tasksIDs && doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { workerID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { workersIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const WorkerPostDelete = async function (doc: WorkerModelType) {
  if (doc.tasksIDs && doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { workerID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $pull: { workersIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
