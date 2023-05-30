import Button from "./Button";
import Todo from "@/types/todoTypes";

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
            todo.completed = e.target.value;
            onChangeStatus(todo);
          }}
        >
          <option value="TODO">TODO</option>
          <option value="PROCESS">PROCESS</option>
          <option value="DONE">DONE</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{todo.deadline}</td>
      <td className="px-6 py-4 whitespace-nowrap flex">
        <Button onClick={() => onDeleteTodo(todo.id)} className="bg-red-400">
          Delete
        </Button>
        <Button onClick={() => onAddDealine(todo.id)} className="bg-green-400">
          Add Dealine
        </Button>
      </td>
    </tr>
  );
};

export default TodoItem;
