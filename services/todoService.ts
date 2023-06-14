import { Level, Status } from "@prisma/client";
import api from "@/untils/apiConfig";

export async function fetchTodos({
  page,
  perPage,
  status,
  searchValue,
  level,
}: {
  page?: number;
  perPage?: number;
  status?: string;
  searchValue?: string;
  level?: string;
}) {
  try {
    const res = await api.get(`/api/todos`, {
      params: {
        page,
        perPage,
        status,
        searchValue,
        level,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createTodo(name: string): Promise<void> {
  try {
    const res = await api.post(`/api/todos`, {
      name,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function updatedTodo({
  id,
  name,
  status,
  deadline,
  level,
  point,
}: {
  id: number;
  name?: string;
  status?: Status;
  deadline?: Date;
  level?: Level;
  point?: number;
}): Promise<void> {
  try {
    const res = await api.put(`/api/todos/${id}`, {
      id,
      name,
      status,
      deadline,
      level,
      point,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
