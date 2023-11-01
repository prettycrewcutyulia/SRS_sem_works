import React from 'react';
import { Box } from '@mui/material';
import type { Todo } from '../../Model/Todo';
import { TodoItem } from './TodoItem/TodoItem';
import { TodoPanel } from '../TodoPanel/TodoPanel';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';

interface TodoListProps {
  // editTodoId: Todo['id'] | null;
}

export const TodoList: React.FC<TodoListProps> = (props) => {
  const todos = useSelector((state: RootState) => state.todo);
  return (
  <Box>
    {todos.map((todo) => {
        // if (todo.id === props.editTodoId)
        // return <TodoPanel mode='edit' editTodo={todo} />;
        return (
        <TodoItem
        todo={todo}
        />
      );
    })}
  </Box>
  )
};