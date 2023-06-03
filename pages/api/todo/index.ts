import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const todos = await prisma.todo.findMany({
        orderBy: { createAt: "asc" },
      });
      return res.json(todos);
    case "POST":
      const todo = await prisma.todo.create({
        data: {
          name: req.body.name,
        },
      });
      return res.json(todo);
    case "PUT":
      const { id, ...data } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data,
      });
      return res.json(updatedTodo);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
