import { Status } from "@prisma/client";
import axios from "axios";
import { initData } from "@/types/todoType";

// import { useRouter } from 'next/router';
// // eslint-disable-next-line react-hooks/rules-of-hooks
// const { asPath } = useRouter();
//     const origin =
//         typeof window !== 'undefined' && window.location.origin
//             ? window.location.origin
//             : '';

//     const URL = `${origin}${asPath}`;


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
  const { data } = await axios.get(`/api/todos`, {
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
  const { data } = await axios.post("/api/todos", { name });
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
  const { data } = await axios.put("/api/todos", { id, name, status, deadline });
}

export async function deleteTodo(id: number): Promise<void> {
  try {
    const response = await axios.delete(`/api/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}