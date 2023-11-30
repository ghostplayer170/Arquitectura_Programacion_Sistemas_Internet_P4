import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

/*
import addCliente from "./resolvers/addCliente.ts";
import addGestor from "./resolvers/addGestor.ts";
import addHipoteca from "./resolvers/addHipoteca.ts";
import deleteCliente from "./resolvers/deleteCliente.ts";
import asignarGestorCliente from "./resolvers/asignarGestorCliente.ts";
import amortizarHipotecaCliente from "./resolvers/amortizarHipotecaCliente.ts";
import transaccionParaCliente from "./resolvers/transaccionParaCliente.ts";
import ingresarDineroCliente from "./resolvers/ingresarDineroCliente.ts";
import depositDineroClientes from "./tasks/depositDineroClientes.ts";
import payingCoutasHipotecas from "./tasks/payingCoutasHipotecas.ts";
*/

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

/*
/worker/:id -> Devolverá el trabajador que corresponde al id
/business/:id -> Devolverá la empresa que corresponde al id
/task/id -> Devolverá la tarea que corresponde al id
/worker/:id -> Eliminará el trabajador que corresponde al id
/business/:id -> Eliminará la empresa que corresponde al id
/task/:id -> Eliminará la tarea que corresponde al id
/worker - > Deberá devolver todos los trabajadores
/business - > Deberá devolver todas las empresas
/task- > Deberá devolver todas las tareas
/worker - > Deberá crear un trabajador
/business - > Deberá crear una empresa
/task- > Deberá devolver todas las tareas
/business/:id/fire/:workerId -> Deberá despedir de la empresa al trabajador que corresponde al id
/business/:id/hire/:workerId -> Deberá contratar de la empresa al trabajador que corresponde al id
/task/:id?status=x -> Cambiara el estado de una tarea
*/

/*
app
  .post("/api/BancoNebrija/addCliente", addCliente)
  .post("/api/BancoNebrija/addGestor", addGestor)
  .post("/api/BancoNebrija/addHipoteca", addHipoteca)
  .delete("/api/BancoNebrija/deleteCliente/:id", deleteCliente)
  .put("/api/BancoNebrija/asignarGestorCliente/:id", asignarGestorCliente)
  .put("/api/BancoNebrija/amortizarHipotecaCliente/:id", amortizarHipotecaCliente)
  .put("/api/BancoNebrija/transaccionParaCliente/:id", transaccionParaCliente)
  .put("/api/BancoNebrija/ingresarDineroCliente/:id", ingresarDineroCliente);
*/
// Ejecutar las funciones cada 5 minutos
const tiempoEjecucion = 5 * 60 * 1000; // 5 minutos en milisegundos

// Iniciar el servidor.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
