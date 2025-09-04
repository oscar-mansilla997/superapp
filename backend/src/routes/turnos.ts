// backend/src/routes/turnos.ts
import { Router } from "express";
import { Turno } from "../models/Turno";

const router = Router();

// GET todos los turnos
router.get("/", async (req, res) => {
  const turnos = await Turno.find();
  res.json(turnos);
});

// POST crear turno
router.post("/", async (req, res) => {
  const { servicioId, usuarioId, fecha, hora } = req.body;

  // Validar si el turno ya está ocupado
  const existe = await Turno.findOne({ servicioId, fecha, hora });
  if (existe) return res.status(400).json({ message: "Horario ya reservado" });

  const turno = new Turno({ servicioId, usuarioId, fecha, hora });
  await turno.save();
  res.json(turno);
});

// GET disponibilidad por servicio
router.get("/disponibilidad/:servicioId", async (req, res) => {
  const { servicioId } = req.params;

  try {
    const turnos = await Turno.find({ servicioId });

    // Generar las próximas 14 fechas
    const days = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i);
      return d.toISOString().split("T")[0]; // yyyy-mm-dd
    });

    // Horarios base de 08:00 a 20:00
    const horariosBase = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

    const disponibilidad: Record<string, string[]> = {};

    days.forEach((day) => {
      const ocupados = turnos.filter(t => t.fecha === day).map(t => t.hora);
      disponibilidad[day] = horariosBase.filter(h => !ocupados.includes(h));
    });

    res.json(disponibilidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al calcular disponibilidad" });
  }
});

export default router;







