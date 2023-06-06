import { useState, useMemo, useEffect } from "react";
import TodoForm from "@/containers/TodoForm";
import Todo, { CompletionStatus } from "@/types/todoType";
import TodoList from "@/containers/TodoList";
import DeadlineModal from "@/components/DeadlineModal";
import { GrClose } from "react-icons/gr";

import { fetchTodos } from "@/services/todoService";
import { storeAddItem, storeDelItem, storeUpdateItem} from "@/services/loadAPIService";

export default function Home({todosData} : {todosData: Todo[]}) {
  const [todos, setTodos] = useState<Todo[]>(todosData)
  const [inputDeadline, setInputDeadline] = useState<string>("");
  const [isAddDeadline, setIsAddDeadline] = useState<boolean>(false);
  const [deadlineTodo, setDeadlineTodo] = useState<Todo>();
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchTodo, setSearchTodo] = useState<string>("");

  let storedAddArr: string[] = [];
  let storedDelArr: number[] = [];
  let storedUpdateArr: Todo[] = [];


  const getTodos = async () => {
    const newTodos = await fetchTodos();
    setTodos(newTodos)
  };

  useEffect(() => {
    getTodos()
  }, [storedUpdateArr, storedAddArr, storedDelArr]);

  const onAddTodo = (name: string) => {
    storeAddItem(storedAddArr, name)
  }

  const onChangeTodo = ({id , ...data}: Todo) => {
    storeUpdateItem(storedUpdateArr,{id, ...data})
  }

  const onDeleteTodo = (id: number) => {
    storeDelItem(storedDelArr, id)
  }

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

  const onSaveDeadline = async() => {
    if (!inputDeadline) return;
    if (deadlineTodo) {
      storeUpdateItem(storedUpdateArr,{
        id: deadlineTodo.id,
        deadline: new Date(inputDeadline),
      })

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
  };

  const result = useMemo(() => {
    return todos.filter(
      (todo) =>
        (filterStatus === "ALL" ? true : todo.status === filterStatus) &&
        todo.name?.toLowerCase().includes(searchTodo.trim().toLowerCase())
    );
  }, [filterStatus, searchTodo, todos]);

  return (
    <div className="container mx-auto py-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">TodoList !!!</h1>

      <TodoForm onAddTodo={onAddTodo}/>

      <div className="mt-6 w-full flex justify-end relative">
        <select
          name="status"
          className="block w-1/5 mr-2 rounded-md bg-green-600 text-white font-bold shadow-sm border-gray-600 focus:border-indigo-600 px-4 py-2"
          value={filterStatus}
          onChange={(e) => {
            onFilterStatus(e.target.value);
          }}
        >
          <option value="ALL">ALL</option>
          <option value="TODO">TODO</option>
          <option value="PROCESS">PROCESS</option>
          <option value="DONE">DONE</option>
        </select>
        <input
          type="text"
          className="w-1/4 border border-gray-400 rounded px-2 py-2"
          placeholder="Search"
          value={searchTodo}
          onChange={(e) => setSearchTodo(e.target.value)}
        />
        {searchTodo && (
          <GrClose
            className="absolute top-3 right-3"
            onClick={() => setSearchTodo("")}
          />
        )}
      </div>

      <TodoList todos={result} onAdddeadline={onAddDeadline} onChangeTodo={onChangeTodo} onDeleteTodo ={onDeleteTodo}/>

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
    </div>
  );
}

export async function getServerSideProps() {
  const todosData = await fetchTodos();
  return {
    props: { todosData },
  }
}