import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Todo from "@/types/todoType";
import Pagination from "@/components/Pagination";

type Props = {
  todos: Todo[];
  onAdddeadline: (id: number) => void;
  onChangeTodo: (editTodo: Todo) => void;
  onDeleteTodo: (id: number) => void;
};

const TodoList = ({ todos, onAdddeadline, onChangeTodo, onDeleteTodo }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;
  const startItem = (currentPage - 1) * pageSize;
  const showTodos = todos.slice(startItem, startItem + pageSize);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!showTodos.length) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos.length]);
  return (
    <>
      <table className="w-full divide-y divide-gray-200 mt-3 border table-auto">
        <thead>
          <tr>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              ID
            </th>
            <th className="w-1/3 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Work
            </th>
            <th className="w-1/6 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Status
            </th>
            <th className="w-1/4 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Deadline
            </th>
            <th className="w-1/3 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {!showTodos.length ? (
            <tr>
              <td className="text-center" colSpan={5}>
                List is empty.
              </td>
            </tr>
          ) : (
            showTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onAdddeadline={onAdddeadline} onChangeTodo={onChangeTodo} onDeleteTodo={onDeleteTodo} />
            ))
          )}
        </tbody>
      </table>

      <Pagination
        quantity={todos.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default TodoList;
