import Button from "../components/Button";
import Todo, { CompletionStatus } from "@/types/todoType";
import { format } from "date-fns";
import { useState, useRef } from "react";

import { updatedTodo, deleteTodo } from "@/services/todoService";

type Props = {
  todo: Todo;
  onAdddeadline: (id: number) => void;
};

const TodoItem = ({ todo, onAdddeadline }: Props) => {


  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(todo.name);

  async function handleUpdateTodo (){
      await updatedTodo({ id: todo.id, name: editName });
      setIsEdit(false);
  }
  return (
    <tr>
      <td className="px-6 py-4 font-bold">{todo.id}</td>
      <td
        onClick={() => setIsEdit(true)}
        className="px-6 py-4 whitespace-nowrap"
      >
        {isEdit ? (
          <input
            type="text"
            className="w-1/2 border border-gray-400 rounded py-1 px-2"
            value={editName}
            autoFocus
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleUpdateTodo}
          />
        ) : (
          todo.name
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          name="status"
          className="block w-32 mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-500"
          value={todo.status}
          onChange={(e) => {
              updatedTodo({
                id: todo.id,
                status:
                  CompletionStatus[
                    e.target.value as keyof typeof CompletionStatus
                  ],
              })
            ;
          }}
        >
          <option value={CompletionStatus.TODO}>TODO</option>
          <option value={CompletionStatus.PROCESS}>PROCESS</option>
          <option value={CompletionStatus.DONE}>DONE</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {todo.deadline && format(new Date(todo.deadline), "MM/dd/yyyy")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap flex">
        <Button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500"
        >
          Delete
        </Button>
        <Button onClick={() => onAdddeadline(todo.id)} className="bg-green-500">
          Add deadline
        </Button>
      </td>
    </tr>
  );
};

export default TodoItem;
