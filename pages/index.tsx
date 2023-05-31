import { useState, useRef, useMemo } from "react";
import TodoForm from "@/containers/TodoForm";
import Todo, { CompletionStatus } from "@/types/todoTypes";
import TodoList from "@/containers/TodoList";
import DeadlineModal from "@/components/DealineModal";


export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<Todo>();

  const [inputDeadline, setInputDeadline] = useState<string>("");
  const [isAddDeadline, setIsAddDeadline] = useState<boolean>(false);
  const [deadlineTodo, setDeadlineTodo] = useState<Todo>();
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchTodo, setSearchTodo] = useState<string>("");

  // handel todo action
  const onChangeInput = (stringInput: string) => {
    setInputValue(stringInput);
  };

  const onAddTodo = () => {
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: CompletionStatus.TODO,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const onSaveEditTodo = (editTodo: Todo | undefined) => {
    if (!inputValue.trim()) return;

    if (editTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === editTodo.id ? { ...todo, text: inputValue } : todo
        )
      );
      setInputValue("");
      setIsEdit(false);
    }
  };

  const onEditTodo = (id: number) => {
    const newEditTodo = todos.find((todo) => todo.id === id);

    if (newEditTodo) {
      setInputValue(newEditTodo.text);
      setEditTodo(newEditTodo);
      setIsEdit(true);
    }
  };

  const onDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setInputValue("");
    setIsEdit(false);
  };

  const onChangeStatus = (newTodo: Todo) => {
    if (filterStatus == "ALL") {
      setTodos(
        todos.map((todo) =>
          todo.id === newTodo.id
            ? { ...todo, completed: newTodo.completed }
            : todo
        )
      );
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === newTodo.id
            ? {
                ...todo,
                completed: newTodo.completed,
                hide: newTodo.completed === filterStatus ? false : true,
              }
            : todo
        )
      );
    }
  };

  // handle Dealine Time
  const onAddDeadline = (id: number) => {
    const deadlineTodo = todos.find((todo) => todo.id === id);

    if (deadlineTodo) {
      setDeadlineTodo(deadlineTodo);
      setIsAddDeadline(true);
    }
  };

  const onChangeInputDeadline = (deadline: string) => {
    setInputDeadline(deadline);
  };

  const onSaveDeadline = () => {
    if (!inputDeadline) return;
    if (deadlineTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === deadlineTodo.id
            ? { ...todo, deadline: new Date(inputDeadline) }
            : todo
        )
      );
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
        (filterStatus === "ALL" ? true : todo.completed === filterStatus) &&
        todo.text.toLowerCase().includes(searchTodo.trim().toLowerCase())
    );
  }, [filterStatus, searchTodo, todos]);

  return (
    <div className="container mx-auto py-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">TodoList !!!</h1>

      <TodoForm
        inputValue={inputValue}
        isEditing={isEdit}
        onChangeInput={onChangeInput}
        onAddTodo={onAddTodo}
        onSaveEditTodo={() => onSaveEditTodo(editTodo)}
      />

      <div className=" mt-6 w-full flex justify-end">
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
        {/* <Button
          primary={false}
          className="bg-red-600 text-white px-4"
          onClick={onSearchTodo}
        >
          <FaSearch />
        </Button> */}
      </div>

      <TodoList
        todos={result}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
        onAddDealine={onAddDeadline}
        onChangeStatus={onChangeStatus}
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
    </div>
  );
}
