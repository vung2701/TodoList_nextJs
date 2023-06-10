import handler from "@/pages/api/todos";
import { Status } from "@prisma/client";
import axios from "axios";
import { initData } from "@/types/todoType";

axios.defaults.baseURL = "http://localhost:3000/api";

export async function fetchTodos({
  currentPage,
  pageSize,
  status,
  searchValue,
}: {
  currentPage?: number;
  pageSize?: number;
  status?: string;
  searchValue?: string;
} = {}): Promise<initData> {
  const { data } = await axios.get(`/todos`, {
    params: {
      page: currentPage,
      perPage: pageSize,
      status: status,
      searchValue: searchValue,
    },
  });
  return data;
}

export async function createTodo(name: string): Promise<void> {
  const { data } = await axios.post("/todos", { name });
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
}): Promise<void> {
  const { data } = await axios.put("/todos", { id, name, status, deadline });
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await axios.delete(`todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}