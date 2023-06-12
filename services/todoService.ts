import { Status } from "@prisma/client";
import { initData } from "@/types/todoType";
import api from "@/untils/api";

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
  const { data } = await api.get(`api/todos`, {
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
  const { data } = await api.post("/api/todos", { name });
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
  const { data } = await api.put("/api/todos", { id, name, status, deadline });
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}