import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getWorker from "./resolvers/getWorker.ts";
import getBusiness from "./resolvers/getBusiness.ts";
import getTask from "./resolvers/getTask.ts";
import getAllWorker from "./resolvers/getAllWorker.ts";
import getAllBusiness from "./resolvers/getAllBusiness.ts";
import getAllTask from "./resolvers/getAllTask.ts";
import deleteWorker from "./resolvers/deleteWorker.ts";
import deleteBusiness from "./resolvers/deleteBusiness.ts";
import deleteTask from "./resolvers/deleteTask.ts";
import addWorker from "./resolvers/addWorker.ts";
import addBusiness from "./resolvers/addBusiness.ts";
import addTask from "./resolvers/addTask.ts";
//import updateBusinessFire from "./resolvers/updateBusinessFire.ts";
//import updateBusinessHire from "./resolvers/updateBusinessHire.ts";
//import updateTaskState from "./resolvers/updateTaskState.ts";

// Importación de función 'load' de Deno para cargar variables de entorno.
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; // Leer variables de entorno
const env = await load(); // Carga Variables de entorno

// Variables de entorno.
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
const PORT = env.PORT || Deno.env.get("PORT");

// Verifica variables de entorno.
if (!MONGO_URL || !PORT) {
  console.log("No mongo URL or Port found");
  Deno.exit(1);
}

// Conexión a la base de datos MongoDB.
try {
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Connected");
} catch (e) {
  console.error(e);
}

// Creación de una instancia de Express.
const app = express();
app.use(express.json());

// Rutas y controladores.
app
  .get("/worker/:id", getWorker)
  .get("/business/:id", getBusiness)
  .get("/task/id", getTask)
  .delete("/worker/:id", deleteWorker)
  .delete("/business/:id", deleteBusiness)
  .delete("/task/id", deleteTask)
  .post("/worker/:id", addWorker)
  .post("/business/:id", addBusiness)
  .post("/task/id", addTask)
  .get("/worker", getAllWorker)
  .get("/business", getAllBusiness)
  .get("/task", getAllTask)
  //.put("/business/:id/fire/:workerId", updateBusinessFire)
  //.put("/business/:id/hire/:workerId", updateBusinessHire)
  //.put("/task/:id?status=x", updateTaskState);

// Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
