import { useState, useRef } from "react"
import Button from "@/components/Button"
import TodoForm from "@/components/TodoForm"
import Todo from "@/types/todotypes"
import TodoList from "@/components/TodoList"
import {CompletionStatus} from "@/types/todotypes"
import DeadlineModal from "@/components/DealineModal"

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<Todo>()
  

  const onChangeInput = (stringInput : string) => {
    setInputValue(stringInput)
  }

  const onAddTodo = () => {
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

  const onSaveEditTodo = (editTodo : Todo | undefined) => {
    if(!inputValue.trim()) return
    
    if(editTodo){
      setTodos(todos.map(todo => todo.id === editTodo.id ? {...todo, text: inputValue} : todo))
      setInputValue("")
      setIsEdit(false)
    }
  }


  const onEditTodo = (id: number) => {
    const newEditTodo = todos.find(todo => todo.id === id)

    if(newEditTodo){
      setInputValue(newEditTodo.text)
      setEditTodo(newEditTodo)
      setIsEdit(true)
    }
  }

  const onDeleteTodo = (id:number) => {
    setTodos(todos.filter(todo => todo.id !== id))
    setInputValue("")
    setIsEdit(false)
  }

  const onChangeStatus = (changeTodo:Todo) => {
    if(changeTodo.completed === CompletionStatus[0]){
      changeTodo.completed = CompletionStatus[1]
    } else if(changeTodo.completed === CompletionStatus[1]){
      changeTodo.completed = CompletionStatus[2]
    } else {
      changeTodo.completed = CompletionStatus[0]
    }
    
    setTodos(todos.map(todo => todo.id === changeTodo.id ? {...todo, completed: changeTodo.completed} : todo ))
  }


  const onAddDealine = (id: number) => {
      
  }

  return (
    <div className="container mx-auto py-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">TodoList !!!</h1>
      
      <TodoForm inputValue={inputValue} isEditing={isEdit} onChangeInput={onChangeInput} onAddTodo={onAddTodo} onSaveEditTodo={() =>onSaveEditTodo(editTodo)}/>
      
      <TodoList todos={todos} onEditTodo={onEditTodo} onDeleteTodo={onDeleteTodo} onChangeStatus={onChangeStatus} onAddDealine={onAddDealine}/>

      {/* <DeadlineModal />
      <div className="overlay"></div> */}
    </div>
  )
}
