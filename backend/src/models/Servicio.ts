// backend/src/models/Servicio.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IServicio extends Document {
  nombre: string;
  descripcion: string;
  foto?: string;
  creadorId: string;
  estado: "pendiente" | "aprobado" | "rechazado";
}

const ServicioSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  foto: { type: String },
  creadorId: { type: String, required: true },
  estado: { type: String, enum: ["pendiente", "aprobado", "rechazado"], default: "pendiente" },
});

export const Servicio = mongoose.model<IServicio>("Servicio", ServicioSchema);

