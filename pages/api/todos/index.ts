import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import { CompletionStatus } from "@/types/todoType";
import { Level } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const totalItems = await prisma.todo.count();
      const currentPage = parseInt(req.query.page as string)
        ? parseInt(req.query.page as string)
        : 1;
      const pageSize = parseInt(req.query.perPage as string)
        ? parseInt(req.query.perPage as string)
        : totalItems;
      const skip = (currentPage - 1) * pageSize;
      const totalPages = Math.ceil(totalItems / pageSize);

      const status = req.query.status ;
      const level = req.query.level ;
      const searchValue = req.query.searchValue as string;

      const todos = await prisma.todo.findMany({
        orderBy: { createAt: "asc" },
        skip,
        take: pageSize,
        where: {
          status:
            status !== "ALL"
              ? CompletionStatus[status as keyof typeof CompletionStatus]
              : {not: undefined},
          level:
            level !== "ALL"
              ? Level[level as keyof typeof Level]
              : {not: undefined},
          name: { contains: searchValue }
        },
      });

      return res.json({
        todos,
        pageInfor: {
          currentPage,
          pageSize,
          totalItems,
          totalPages,
        },
      });
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
