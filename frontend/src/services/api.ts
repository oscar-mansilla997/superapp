const API_URL = "http://localhost:5000"; // 👉 Cambialo por la URL de tu backend en producción

// -------------------------
// Servicios
// -------------------------
export async function getServicios() {
  const res = await fetch(`${API_URL}/servicios`);
  return res.json();
}

export async function createServicio(data: any) {
  const res = await fetch(`${API_URL}/servicios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// -------------------------
// Usuarios
// -------------------------
export async function getUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
}

export async function createUsuario(data: any) {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// -------------------------
// Reservas
// -------------------------
export async function getReservas() {
  const res = await fetch(`${API_URL}/reservas`);
  return res.json();
}

export async function createReserva(data: any) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function cancelarReserva(id: string) {
  const res = await fetch(`${API_URL}/reservas/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// -------------------------
// Disponibilidad
// -------------------------
export async function getDisponibilidad(servicioId: string) {
  const res = await fetch(`${API_URL}/servicios/${servicioId}/disponibilidad`);
  return res.json(); // Debe devolver un objeto: { "2025-09-02": ["08:00","09:00"], ... }
}

