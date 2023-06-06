import handler from "@/pages/api/todo";
import { Status } from "@prisma/client";
import axios from "axios";
import Todo from "@/types/todoType";

axios.defaults.baseURL = "http://localhost:3000/api";

export async function fetchTodos(): Promise<Todo[]> {
  const { data } = await axios.get("/todo");
  return data;
}

export async function createTodo(name: string): Promise<void> {
  const { data } = await axios.post("/todo", { name });
}

export async function updateTodo({
  id,
  name,
  status,
  deadline,
}: Todo): Promise<void> {
  const { data } = await axios.put(`todo/${id}`, {
    id,
    name,
    status,
    deadline,
  });
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const { data } = await axios.delete(`todo/${id}`);
  } catch (error) {
    console.error(error);
  }
}
