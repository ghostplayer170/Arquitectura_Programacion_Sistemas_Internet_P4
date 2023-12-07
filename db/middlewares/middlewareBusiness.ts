import { BusinessModelType } from "../schemas/business.ts";
import { TaskModel } from "../schemas/task.ts";
import { WorkerModel } from "../schemas/worker.ts";

export const BusinessPostSave = async function (doc: BusinessModelType) {
  if (doc.tasksIDs && doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { BusinesssID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.workersIDs && doc.workersIDs.length) {
    try {
      await WorkerModel.updateMany(
        { _id: { $in: doc.workersIDs } },
        { BusinesssID: doc._id },
      );
      // Encuentra todos los workers cuyos IDs no estén en la lista doc.workersIDs
      await WorkerModel.updateMany(
        { _id: { $nin: doc.workersIDs }, businessID: doc._id },
        { $set: { businessID: null } }, // Establece el campo businessID a null
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const BusinessPostDelete = async function (doc: BusinessModelType) {
  if (doc.tasksIDs && doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { BusinesssID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.workersIDs && doc.workersIDs.length) {
    try {
      await WorkerModel.updateMany(
        { _id: { $in: doc.workersIDs } },
        { BusinesssID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
