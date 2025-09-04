// backend/src/server.ts
import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db";
import serviciosRoutes from "./routes/servicios";
import turnosRoutes from "./routes/turnos";

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
connectDB();

// Rutas
app.use("/servicios", serviciosRoutes);
app.use("/turnos", turnosRoutes);

app.listen(5000, () => console.log("Backend corriendo en puerto 5000"));










