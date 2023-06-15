import { useState, useMemo, useEffect } from "react";
import TodoForm from "@/components/home/TodoForm";
import Todo, { CompletionStatus, Level, initData } from "@/types/todoType";
import TodoList from "@/components/home/TodoList";
import DeadlineModal from "@/components/home/DeadlineModal";
import { GrClose } from "react-icons/gr";
import { useRouter } from "next/router";

import { GetServerSidePropsContext } from "next";

import { fetchTodos, updatedTodo } from "@/services/todoService";
import Pagination from "@/components/common/Pagination";
import Header from "@/components/layouts/Header";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function Home(initTodos: Todo[]) {
  const router = useRouter();
  const query = router.query;
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [inputDeadline, setInputDeadline] = useState<string>("");
  const [isAddDeadline, setIsAddDeadline] = useState<boolean>(false);
  const [deadlineTodo, setDeadlineTodo] = useState<Todo>();
  const [filterStatus, setFilterStatus] = useState<string>(
    query.status?.toString() ? query.status.toString() : "ALL"
  );
  const [filterLevel, setFilterLevel] = useState<string>(
    query.level?.toString() ? query.level.toString() : "ALL"
  );
  const [searchName, setSearchName] = useState<string>(
    query.searchValue?.toString() ? query.searchValue.toString() : ""
  );

  const [page, setPage] = useState<number>(Number(query.page)? Number(query.page): 1);
  const perPage = 2

  const onPageChange = (page: number) => {
    setPage(page);
    router.push({
      pathname: "",
      query: {
        ...query,
        page,
      },
    });
  };

  const getTodos = async () => {
    const newTodos = await fetchTodos({
      page,
      perPage,
      status: filterStatus,
      searchValue: searchName,
      level: filterLevel,
    });
    setTodos(newTodos);
    if (!newTodos.length && page !== 1) {
      setPage(page - 1);
    }
    const allNewTodos = await fetchTodos({
      status: filterStatus,
      searchValue: searchName,
      level: filterLevel,
    });
    setAllTodos(allNewTodos);
  };

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, todos.length, filterStatus, searchName, filterLevel]);

  // handle deadline Time
  const onAddDeadline = (id: number) => {
    const deadlineTodo = todos.find((todo) => todo.id === id);

    if (deadlineTodo) {
      setDeadlineTodo(deadlineTodo);
      setIsAddDeadline(true);
      setInputDeadline("");
    }
  };

  const onChangeInputDeadline = (deadline: string) => {
    setInputDeadline(deadline);
  };

  const onSaveDeadline = async () => {
    if (!inputDeadline) return;
    if (deadlineTodo) {
      await updatedTodo({
        id: deadlineTodo.id,
        deadline: new Date(inputDeadline),
      });
      getTodos();
      setIsAddDeadline(false);
      setInputDeadline("");
    }
  };

  const onCancelDeadline = () => {
    setIsAddDeadline(false);
  };

  // Filter Status
  const onFilterStatus = (status: string) => {
    setFilterStatus(status);
    router.push({
      pathname: "",
      query: {
        ...query,
        status,
      },
    });
  };

  const onFilterLevel = (level: string) => {
    setFilterLevel(level);
    router.push({
      pathname: "",
      query: {
        ...query,
        level,
      },
    });
  };

  // const result = useMemo(() => {
  //   return todos.filter(
  //     (todo) =>
  //       (filterStatus === "ALL" ? true : todo.status === filterStatus) &&
  //       todo.name?.toLowerCase().includes(searchName.trim().toLowerCase())
  //   );
  // }, [filterStatus, searchName, todos]);

  return (
    <DefaultLayout>
      <div className="container mx-auto py-6 flex flex-col">
        <h1 className="text-4xl mt-4 font-bold mb-4 text-center">TODO</h1>

        <TodoForm reloadData={getTodos} />

        <div className="mt-6 w-full flex justify-end relative">
          <select
            name="level"
            className="block w-1/8 mr-2 rounded-md bg-blue-600 text-white font-bold shadow-sm border-gray-600 focus:border-indigo-600 px-4 py-2"
            value={filterLevel}
            onChange={(e) => {
              onFilterLevel(e.target.value);
            }}
          >
            <option value="ALL">ALL</option>
            <option value={Level.EASY}>EASY</option>
            <option value={Level.MEDIUM}>MEDIUM</option>
            <option value={Level.HARD}>HARD</option>
          </select>

          <select
            name="status"
            className="block w-1/8 mr-2 rounded-md bg-green-600 text-white font-bold shadow-sm border-gray-600 focus:border-indigo-600 px-4 py-2"
            value={filterStatus}
            onChange={(e) => {
              onFilterStatus(e.target.value);
            }}
          >
            <option value="ALL">ALL</option>
            <option value={CompletionStatus.TODO}>TODO</option>
            <option value={CompletionStatus.PROCESS}>PROCESS</option>
            <option value={CompletionStatus.DONE}>DONE</option>
          </select>

          <input
            type="text"
            className="w-1/6 border border-gray-400 rounded px-2 py-2"
            placeholder="Search"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              router.push({
                pathname: "",
                query: {
                  ...query,
                  searchValue: e.target.value,
                },
              });
            }}
          />
          {searchName && (
            <GrClose
              className="absolute top-3 right-3"
              onClick={() => {
                setSearchName("");
                router.push({
                  pathname: "",
                  query: {
                    ...query,
                    searchValue: "",
                  },
                });
              }}
            />
          )}
        </div>

        <TodoList
          todos={todos}
          onAdddeadline={onAddDeadline}
          reloadData={getTodos}
        />

        {isAddDeadline && (
          <>
            <DeadlineModal
              inputDeadline={inputDeadline}
              onChangeInputDeadline={onChangeInputDeadline}
              onSaveDeadline={onSaveDeadline}
              onCancelDeadline={onCancelDeadline}
            />
            <div className="overlay"></div>
          </>
        )}

        <Pagination
          quantity={allTodos.length}
          perPage={perPage}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </DefaultLayout>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query;
  // Fetch data from the API endpoint
  const initTodos = await fetchTodos(query);
  const serializedTodos = initTodos ? JSON.parse(JSON.stringify(initTodos)) : [];
  return {
    props: {
      initTodos: serializedTodos,
    },
  };
}