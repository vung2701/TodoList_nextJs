import handler from "@/pages/api/todo";
import { Status } from "@prisma/client";
import axios from "axios";
import Todo from "@/types/todoType";

axios.defaults.baseURL = "http://localhost:3000/api";

export async function fetchTodos(): Promise<Todo[]> {
  const { data } = await axios.get("/todo");
  return data;
}

export async function createTodo(name: string) {
  const { data } = await axios.post("/todo", { name });
}

export async function updatedTodo({
  id,
  name,
  status,
  deadline,
}: {
  id: number;
  name?: string;
  status?: Status;
  deadline?: Date;
}) {
  const { data } = await axios.put("/todo", { id, name, status, deadline });
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await axios.delete(`/api/todolist/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
