import Button from "../components/Button";
import Todo, { CompletionStatus } from "@/types/todoType";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, changeTodo } from "@/features/todo/todosSlice";

type Props = {
  todo: Todo;
  onAddDealine: (id: number) => void;
};

const TodoItem = ({ todo, onAddDealine }: Props) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(todo.name);

  return (
    <tr>
      <td className="px-6 py-4 font-bold">{todo.id}</td>
      <td
        onClick={() => setIsEdit(true)}
        className="px-6 py-4 whitespace-nowrap"
      >
        {todo.name}
        {isEdit && (
          <input
            type="text"
            className="w-1/2 border border-gray-400 rounded py-1 px-2"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={() => {
              dispatch(changeTodo({ id: todo.id, name: editName }));
              setIsEdit(false);
            }}
          />
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          name="status"
          className="block w-32 mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-500"
          value={todo.status}
          onChange={(e) => {
            dispatch(
              changeTodo({
                id: todo.id,
                status:
                  CompletionStatus[
                    e.target.value as keyof typeof CompletionStatus
                  ],
              })
            );
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
          onClick={() => dispatch(deleteTodo(todo.id))}
          className="bg-red-500"
        >
          Delete
        </Button>
        <Button onClick={() => onAddDealine(todo.id)} className="bg-green-500">
          Add Dealine
        </Button>
      </td>
    </tr>
  );
};

export default TodoItem;
