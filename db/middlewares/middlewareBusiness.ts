import { BusinessModelType } from "../schemas/business.ts";
import { TaskModel } from "../schemas/task.ts";
import { WorkerModel } from "../schemas/worker.ts";

export const BusinessPostSave = async function (doc: BusinessModelType) {
  if (doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { BusinesssID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.workersIDs.length) {
    try {
      await WorkerModel.updateMany(
        { _id: { $in: doc.workersIDs } },
        { BusinesssID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const BusinessPostDelete = async function (doc: BusinessModelType) {
  if (doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { BusinesssID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.workersIDs.length) {
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

export const fireWorkerMiddleware = async function (
  doc: BusinessModelType,
  workerId: string,
) {
  try {
    await WorkerModel.updateOne({ _id: workerId, BusinessID: doc._id }, {
      BusinesssID: null,
    });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    throw new Error("Error al despedir al trabajador");
  }
};
