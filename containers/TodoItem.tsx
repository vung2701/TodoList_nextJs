import Button from "../components/Button";
import Todo, { CompletionStatus } from "@/types/todoTypes";
import { format } from "date-fns";

type Props = {
  todo: Todo;
  onEditTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onAddDealine: (id: number) => void;
  onChangeStatus: (todo: Todo) => void;
};

const TodoItem = ({
  todo,
  onEditTodo,
  onDeleteTodo,
  onAddDealine,
  onChangeStatus,
}: Props) => {
  return (
    <tr>
      <td className="px-6 py-4 font-bold">
        {todo.id}
      </td>
      <td onClick={() => onEditTodo(todo.id)} className="px-6 py-4 whitespace-nowrap">{todo.text}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          name="status"
          className="block w-32 mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-500"
          value={todo.completed}
          onChange={(e) => {
            todo.completed = CompletionStatus[e.target.value as keyof typeof CompletionStatus]
            onChangeStatus(todo);
          }}
        >
          <option value={CompletionStatus.TODO}>TODO</option>
          <option value={CompletionStatus.PROCESS}>PROCESS</option>
          <option value={CompletionStatus.DONE}>DONE</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{todo.deadline && format(new Date(todo.deadline), "MM/dd/yyyy")}</td>
      <td className="px-6 py-4 whitespace-nowrap flex">
        <Button onClick={() => onDeleteTodo(todo.id)} className="bg-red-500">
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
