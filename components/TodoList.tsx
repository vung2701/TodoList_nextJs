import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Todo from "@/types/todoTypes";
import Pagination from "@/components/Pagination";

type Props = {
  todos: Todo[];
  onEditTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onAddDealine: (id: number) => void;
  onChangeStatus: (todo: Todo) => void;
};

const TodoList = ({
  todos,
  onEditTodo,
  onDeleteTodo,
  onAddDealine,
  onChangeStatus,
}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 2;
  const startItem = (currentPage - 1) * pageSize;
  const newTodos = todos.filter((todo) => todo.hide == false);
  const showTodos = newTodos.slice(startItem, startItem + pageSize);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!showTodos.length) {
      setCurrentPage(1);
    }
  }, [showTodos.length]);
  return (
    <>
      <table className="min-h-900 w-full divide-y divide-gray-200 mt-3 border table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Work
            </th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
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
              <TodoItem
                key={todo.id}
                todo={todo}
                onEditTodo={onEditTodo}
                onDeleteTodo={onDeleteTodo}
                onAddDealine={onAddDealine}
                onChangeStatus={onChangeStatus}
              />
            ))
          )}
        </tbody>
      </table>

      <Pagination
        quantity={newTodos.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default TodoList;
