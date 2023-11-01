import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';


export const Header: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todo);
  const completedTodos = todos.filter(todo => todo.checked);
  const uncompletedTodos = todos.filter(todo => !todo.checked);

  return(
  <Box textAlign='left'>
     <Typography sx={{ fontSize: 35 }} variant='h1' component='h1' gutterBottom>
        Todo list
      </Typography>
      <Typography variant='h6' gutterBottom>
        {completedTodos.length} task(s) completed
      </Typography>
      <Typography variant='h6' gutterBottom>
        {uncompletedTodos.length} task(s) not completed
      </Typography>
  </Box>
  )
};