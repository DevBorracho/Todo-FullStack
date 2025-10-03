import { getTasks, createTask, deleteTask } from "../models/metodos.js";

export const getTasksController = async (req, res) => {
  try {
    const tasks = await getTasks();
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No hay tareas" });
    }
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};
export const postTaskController = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const task = await createTask({ title, description });
    if (!task) {
      return res.status(500).json({ error: "Error al crear la tarea" });
    }
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Faltan datos" });
    }
    const task = await deleteTask(id);
    if (!task) {
      return res.status(404).json({ error: "no existe la tarea a eliminar" });
    }
    res.json({ message: "tarea eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
