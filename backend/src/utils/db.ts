import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://usersuperapp:superapp2025@cluster0.ocadvmg.mongodb.net/superapp?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};






