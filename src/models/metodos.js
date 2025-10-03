import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async () => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

export const createTask = async taskData => {
  const task = await prisma.task.create({ data: taskData });
  return task;
};

export const deleteTask = async id => {
  const task = await prisma.task.delete({ where: { id } });
  return task;
};
