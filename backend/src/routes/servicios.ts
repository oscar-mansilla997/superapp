// backend/src/routes/servicios.ts
import { Router } from "express";
import { Servicio } from "../models/Servicio";

const router = Router();

// GET todos los servicios
router.get("/", async (req, res) => {
  const servicios = await Servicio.find();
  res.json(servicios);
});

// POST crear servicio
router.post("/", async (req, res) => {
  const { nombre, descripcion, foto, creadorId } = req.body;
  const servicio = new Servicio({ nombre, descripcion, foto, creadorId });
  await servicio.save();
  res.json(servicio);
});

export default router;





