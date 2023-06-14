/* eslint-disable react/no-unescaped-entities */
import Button from "../components/Button";
import Todo, { CompletionStatus } from "@/types/todoType";
import { format } from "date-fns";
import { useState, useRef } from "react";

import { updatedTodo, deleteTodo } from "@/services/todoService";
import { Level } from "@prisma/client";

type Props = {
  todo: Todo;
  onAdddeadline: (id: number) => void;
  reloadData: () => void;
};

const TodoItem = ({ todo, onAdddeadline, reloadData }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditPoint, setIsEditPoint] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(todo.name ? todo.name : "");
  const [point, setPoint] = useState<number | undefined>(todo.point);

  async function handleChangeName() {
    await updatedTodo({ id: todo.id, name: editName });
    setIsEdit(false);
    reloadData();
  }

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    reloadData();
  };

  const handleChangeStatus = async (status: string) => {
    await updatedTodo({
      id: todo.id,
      status: CompletionStatus[status as keyof typeof CompletionStatus],
    });
    reloadData();
  };

  const handleChangeLevel = async (level: string) => {
    await updatedTodo({
      id: todo.id,
      level: Level[level as keyof typeof Level],
    });
    reloadData();
  };

  const handleChangePoint = async (point: string) => {
    if (!isNaN(Number(point)) && Number(point) >= 0 && Number(point) <= 10) {
      setPoint(Number(point));
    }
  };

  const handleSavePoint = async () => {
    await updatedTodo({ id: todo.id, point: point });
    setIsEditPoint(false);
    reloadData();
  };

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
            onBlur={handleChangeName}
          />
        ) : (
          todo.name
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          name="status"
          className="w-30 mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 bg-transparent"
          value={todo.status}
          onChange={(e) => handleChangeStatus(e.target.value)}
        >
          <option value={CompletionStatus.TODO}>TODO</option>
          <option value={CompletionStatus.PROCESS}>PROCESS</option>
          <option value={CompletionStatus.DONE}>DONE</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {todo.deadline ? (
          <>
            {format(new Date(todo.deadline), "MM/dd/yyyy").toString()}
            <a
              className="pl-3 italic underline hover:cursor-pointer hover:text-blue-500"
              onClick={(e) => {
                e.preventDefault();
                onAdddeadline(todo.id);
              }}
            >
              Edit
            </a>
          </>
        ) : (
          <span
            className="italic underline hover:cursor-pointer hover:text-blue-500"
            onClick={() => {
              onAdddeadline(todo.id);
            }}
          >
            Add deadline
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <select
          name="level"
          className="w-30 mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 bg-transparent"
          value={todo.level}
          onChange={(e) => handleChangeLevel(e.target.value)}
        >
          <option value={Level.EASY}>EASY</option>
          <option value={Level.MEDIUM}>MEDIUM</option>
          <option value={Level.HARD}>HARD</option>
        </select>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditPoint ? (
          <input
            type="number"
            min={0}
            max={10}
            className="w-16 border border-gray-400 rounded py-1 px-2"
            value={point}
            autoFocus
            onChange={(e) => handleChangePoint(e.target.value)}
            onBlur={handleSavePoint}
          />
        ) : todo.point || todo.point === 0 ? (
          <span onClick={() => setIsEditPoint(true)}>{todo.point}</span>
        ) : (
          <span
            onClick={() => setIsEditPoint(true)}
            className="italic underline hover:cursor-pointer hover:text-blue-500"
          >
            Add point
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button
          onClick={() => handleDeleteTodo(todo.id)}
          className="bg-red-500"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TodoItem;
function async() {
  throw new Error("Function not implemented.");
}
