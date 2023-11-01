// todoSlice.js
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../Model/Todo';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      const updatedState = state.filter((todo) => todo.id !== idToDelete);
      return updatedState;
    },    
    updateTodo: (state, action) => {
      const { id, name, description } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.name = name;
        todo.description = description;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.checked = !todo.checked;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
