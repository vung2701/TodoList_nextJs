import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import { Console } from "console";

export default async function handlerIdTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "DELETE":
        const {id} = req.query;
      const deletedTodo = await prisma.todo.delete({
        where: { id: Number(id) },
      });
      return res.json(deletedTodo);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
