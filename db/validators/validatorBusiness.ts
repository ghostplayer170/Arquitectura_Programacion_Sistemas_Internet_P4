import mongoose from "npm:mongoose@7.6.3";
import { BusinessModel } from "../schemas/business.ts";

// Validar que todas las tareas con los IDs dados existen
BusinessModel.schema.path("tasksIDs").validate(async function (
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
BusinessModel.schema.path("workersIDs").validate(async function (
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