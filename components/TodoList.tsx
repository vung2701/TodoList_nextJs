
import TodoItem from "./TodoItem"
import Todo from "@/types/todotypes"

type Props = {
    todos: Todo[],
    onEditTodo: (id: number) => void,
    onDeleteTodo: (id: number) => void,
    onChangeStatus: (toto: Todo) => void,
    onAddDealine: (id: number) => void
}

const TodoList = ({todos, onEditTodo, onDeleteTodo, onChangeStatus, onAddDealine} : Props) => {

    return (
        <table className="w-full divide-y divide-gray-200 mt-4 border table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">Work</th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">Deadline</th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {!todos.length
              ? (<tr><td className="text-center" colSpan={5}>List is empty.</td></tr>)
              : todos.map(todo => <TodoItem key={todo.id} todo={todo} onEditTodo={onEditTodo} onDeleteTodo={onDeleteTodo} onChangeStatus={onChangeStatus} onAddDealine={onAddDealine}/>)}
        </tbody>
      </table>
    )
}

export default TodoList