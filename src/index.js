import express from "express";
import tasksRoutes from "./routes/tasks.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// API
app.use("/api/tasks", tasksRoutes);

// __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Servir tu frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../client")));

// ✅ Ruta raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/HTML/index.html"));
});

// ✅ Fallback opcional (para SPAs o rutas no encontradas)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/HTML/index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
