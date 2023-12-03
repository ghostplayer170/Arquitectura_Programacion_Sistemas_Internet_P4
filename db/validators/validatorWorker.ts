import mongoose from "npm:mongoose@7.6.3";
import { TaskModel } from "../schemas/task.ts";
import { BusinessModel } from "../schemas/business.ts";

// Validar que todas las tareas con los IDs dados existen
const tasksExists = async (
  tasksIDs: mongoose.Types.ObjectId[],
): Promise<boolean> => {
  try {
    const tasksCount = await TaskModel.countDocuments({
      _id: { $in: tasksIDs },
    });
    return tasksCount === tasksIDs.length;
  } catch (_e) {
    return false;
  }
};

// Valida si el correo electrónico tiene el formato *@*.*
const validEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar que el número total no excede 10
const tasksMax = async (
  tasksIDs: mongoose.Types.ObjectId[],
): Promise<boolean> => {
  try {
    const tasksCount = await TaskModel.countDocuments({
      _id: { $in: tasksIDs },
    });
    return tasksCount <= 10;
  } catch (_e) {
    return false;
  }
};

// Validate that a business with the given ID exists in the database
const businessExists = async (
  businessID: mongoose.Types.ObjectId,
): Promise<boolean> => {
  try {
    const business = await BusinessModel.findById(businessID);
    return !!business; // Convertir el resultado a un booleano
  } catch (_e) {
    return false;
  }
};

export const validatorsWorker = {
  businessExists,
  tasksMax,
  tasksExists,
  validEmail,
};
