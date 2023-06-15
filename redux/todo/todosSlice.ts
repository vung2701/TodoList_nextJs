import Todo, { CompletionStatus } from "@/types/todoType";
import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: <Todo[]>[],
  reducers: {
    addTodo: (state: Todo[], action: { payload: string }) => {
      const newTodo: Todo = {
        id: Date.now(),
        name: action.payload,
        status: CompletionStatus.TODO
      }
      state.push(newTodo);
    },
    deleteTodo: (state: Todo[], action: { payload: number }) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    changeTodo: (
      state: Todo[],
      action: {
        payload: {
          id: number;
          name?: string;
          status?: CompletionStatus;
          deadline?: Date;
        };
      }
    ) => {
      const Index = state.findIndex((todo) => todo.id === action.payload.id);
      if (Index !== -1) {
        state[Index] = { ...state[Index], ...action.payload };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, changeTodo } = todoSlice.actions;

export default todoSlice.reducer;
