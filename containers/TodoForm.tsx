import Button from "../components/Button";
import { useState } from "react";
import { storeAddItem } from "@/services/loadAPIService";

type Props = {
  onAddTodo: (name: string) => void,
  
}
const TodoForm = ({onAddTodo}: Props) => {

  const [nameTodoInput, setNameTodoInput] = useState<string>("");

  const handleAddTodo = () =>{
    if(!nameTodoInput) return
    onAddTodo(nameTodoInput);
    setNameTodoInput("");
  }
  return (
    <div className="flex flex-col justify-center w-full">
      <input
        type="text"
        className="border border-gray-400 rounded px-2 py-3"
        placeholder="Input a new todo..."
        value={nameTodoInput}
        onChange={(e) => setNameTodoInput(e.target.value)}
      />
      <Button
        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 "
        onClick={handleAddTodo}
        primary={false}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoForm;
