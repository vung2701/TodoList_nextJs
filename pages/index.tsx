import { useState, useRef } from "react"


type Todo = {
  id: number
  text: string
  completed: boolean
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [isEdit, setIsEdit] = useState<boolean>()
  const [editTodo, setEditTodo] = useState<Todo>()
  

  const handleAddTodo = () => {
    if(!inputValue.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInputValue("")
  }

  const handleDeleteTodo = (id:number) => {
    setTodos(todos.filter(todo => todo.id !== id))
    setInputValue("")
    setIsEdit(false)
  }

  const handleEditTodo = (id:number) => {
    const newEditTodo = todos.find(todo => todo.id === id)

    if(newEditTodo){
      setInputValue(newEditTodo.text)
      setEditTodo(newEditTodo)
      setIsEdit(true)
    }
  }

  const handleSaveEditTodo = () =>{
    if(!inputValue.trim()) return

    if(editTodo){
      setTodos(todos.map(todo => todo.id === editTodo.id ? {...todo, text: inputValue} : todo))
      setInputValue("")
      setIsEdit(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">TodoList !!!</h1>
      <div className="flex flex-col justify-center w-full">
        <input 
          type="text" 
          className="border border-gray-400 rounded px-2 py-1"
          placeholder="Input a new todo..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        {isEdit
        ?(<button 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded"
          onClick={() => handleSaveEditTodo()}
        >
          Save Edit
        </button>)
        :(<button 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>)
        }
        
      </div>
      <table className="min-w-full divide-y divide-gray-200 mt-4 border">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">Work</th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-gray-800 uppercase tracking-wider" colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {!todos.length
              ? (<tr><td className="text-center" colSpan={5}>List is empty.</td></tr>)
              : todos.map(todo => (
                <tr key={todo.id}>
                  <td  onClick={() => handleEditTodo(todo.id)} className="px-6 py-4 font-bold">{todo.id}</td>
                  <td className="px-6 py-4">{todo.text}</td>
                  {todo.completed 
                  ? <td className="px-6 py-4">Done</td>
                  : <td className="px-6 py-4">Pending</td>
                  }
                  
                  <td className="px-6 py-4">
                    <button onClick={() => handleChange} className="px-6 py-2 rounded bg-green-400 text-white font-bold uppercase">Toggle</button>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteTodo(todo.id)} className="px-6 py-2 rounded bg-red-400 text-white">Delete</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}
