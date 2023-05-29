import { useState, useRef } from "react"
import Button from "@/components/Button"


enum CompletionStatus {
  TODO,
  PROCESS,
  DONE
}

type Todo = {
  id: number
  text: string
  completed: string
  deadline: string
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
      completed: CompletionStatus[0],
      deadline: ""
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

  const handleChangeStatus = (changeTodo:Todo) => {
    if(changeTodo.completed === CompletionStatus[0]){
      changeTodo.completed = CompletionStatus[1]
    } else if(changeTodo.completed === CompletionStatus[1]){
      changeTodo.completed = CompletionStatus[2]
    } else {
      changeTodo.completed = CompletionStatus[0]
    }
    
    setTodos(todos.map(todo => todo.id === changeTodo.id ? {...todo, completed: changeTodo.completed} : todo ))
  }


  const handleAddDealine = (id: number) => {
      
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">TodoList !!!</h1>
      <div className="flex flex-col justify-center w-full">
        <input 
          type="text" 
          className="border border-gray-400 rounded px-2 py-3"
          placeholder="Input a new todo..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        {isEdit
        ?(<Button 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1"
          onClick={() => handleSaveEditTodo()}
        >
          Save Edit
        </Button>)
        :(<Button 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1"
          onClick={handleAddTodo}
        >
          Add Todo
        </Button>)
        }
        
      </div>
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
              : todos.map(todo => (
                <tr key={todo.id}>
                  <td  onClick={() => handleEditTodo(todo.id)} className="px-6 py-4 font-bold">{todo.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.text}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.completed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{todo.deadline}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex">
                    <Button onClick={() => handleChangeStatus(todo)} className="mx-2 px-6 py-2 bg-green-400 text-white font-bold uppercase">Toggle</Button>
                    <Button onClick={() => handleDeleteTodo(todo.id)} className="mx-2 px-6 py-2 bg-red-400 text-white">Delete</Button>
                    <Button onClick={() => handleAddDealine(todo.id)} className="mx-2 px-6 py-2 bg-blue-400 text-white">Add Dealine</Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Model add dealine */}
      {/* <div className="bg-white top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 border border-gray-800 w-1/3 px-10 py-10 rounded">
        <div className="w-full">
          <label htmlFor="">Time dealine: </label>
          <input 
            type="text" 
            className="border border-gray-400 rounded px-2 py-2"
            placeholder="Input a todo deadline..."
            value={inputValue}
        />
        </div>
        <Button>Add</Button>
        <Button>Cancel</Button>
      </div> */}
    </div>
  )
}
