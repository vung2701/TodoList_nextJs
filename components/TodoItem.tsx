
import Button from "./Button"
import Todo from "@/types/todotypes"

type Props = {
    key: number
    todo: Todo,
    onEditTodo: (id: number) => void,
    onDeleteTodo: (id: number) => void,
    onChangeStatus: (toto: Todo) => void,
    onAddDealine: (id: number) => void
}

const TodoItem = ({key, todo, onEditTodo, onDeleteTodo, onChangeStatus, onAddDealine} : Props) => {
    return (
        <tr key={key}>
                  <td  onClick={() => onEditTodo(todo.id)} className="px-6 py-4 font-bold">{todo.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.text}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.completed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.deadline}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Button onClick={() => onChangeStatus(todo)} className="bg-green-400 font-bold uppercase">Toggle</Button>
                    <Button onClick={() => onDeleteTodo(todo.id)} className="bg-red-400">Delete</Button>
                    <Button onClick={() => onAddDealine(todo.id)} className="bg-blue-400">Add Dealine</Button>
                  </td>
                </tr>
    )
}

export default TodoItem