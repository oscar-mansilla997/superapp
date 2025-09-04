// backend/src/models/Turno.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITurno extends Document {
  servicioId: string;
  usuarioId: string;
  fecha: string;
  hora: string;
  estado: "pendiente" | "confirmado" | "rechazado";
}

const TurnoSchema: Schema = new Schema({
  servicioId: { type: String, required: true },
  usuarioId: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  estado: { type: String, enum: ["pendiente", "confirmado", "rechazado"], default: "pendiente" },
});

export const Turno = mongoose.model<ITurno>("Turno", TurnoSchema);




  
