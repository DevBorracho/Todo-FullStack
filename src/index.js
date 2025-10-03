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
app.use("/api", tasksRoutes);

// __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/tasks", getTasksController);
router.post("/tasks", postTaskController);
router.delete("/tasks/:id", deleteTaskController);

app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
