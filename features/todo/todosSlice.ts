import Todo, { CompletionStatus } from "@/types/todoType";
import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: <Todo[]>[],
  reducers: {
    addTodo: (state: Todo[], action: { payload: Todo }) => {
      state.push(action.payload);
    },
    deleteTodo: (state: Todo[], action: { payload: number }) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    changeTodo: (
      state: Todo[],
      action: { payload: { editId: number; newName: string } }
    ) => {
      const newTodo  = state.find(todo => todo.id === action.payload.editId)
      if(newTodo) newTodo.name = action.payload.newName
    },
    changeStatusTodo: (
      state: Todo[],
      action: { payload: { id: number; newStatus: CompletionStatus } }
    ) => {
      const newTodo  = state.find(todo => todo.id === action.payload.id)
      if(newTodo) newTodo.status = action.payload.newStatus
    },
    addDealineTodo: (
      state: Todo[],
      action: { payload: { id: number; deadline: Date } }
    ) => {
      const newTodo  = state.find(todo => todo.id === action.payload.id)
      if(newTodo) newTodo.deadline = action.payload.deadline
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  deleteTodo,
  changeTodo,
  changeStatusTodo,
  addDealineTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
