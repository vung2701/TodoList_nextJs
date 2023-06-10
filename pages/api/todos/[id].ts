import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";

export default async function handlerIdTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "PUT":
      const { id, ...data } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data,
      });
      return res.json(updatedTodo);
    case "DELETE":
        const inputId = req.query.id;
      const deletedTodo = await prisma.todo.delete({
        where: { id: Number(inputId) },
      })
      return res.json(deletedTodo);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
