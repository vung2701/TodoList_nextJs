import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Todo from "@/types/todoType";

type Props = {
  todos: Todo[];
  onAdddeadline: (id: number) => void;
  reloadData: () => void;
};

const TodoList = ({ todos, onAdddeadline, reloadData }: Props) => {
  

  return (
    <>
      <table className="w-full divide-y divide-gray-200 mt-3 border table-auto">
        <thead className="bg-blue-200">
          <tr>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              ID
            </th>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Work
            </th>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Status
            </th>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Deadline
            </th>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Level
            </th>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Point
            </th>
            <th className="w-1/7 px-6 py-3 text-left text-gray-800 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          {!todos.length ? (
            <tr className="">
              <td className="text-center" colSpan={7}>
                List is empty.
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onAdddeadline={onAdddeadline} reloadData={reloadData}/>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;