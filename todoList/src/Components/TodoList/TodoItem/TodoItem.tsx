import { useDispatch } from 'react-redux';
import type { Todo } from '../../../Model/Todo';
import { deleteTodo, toggleTodo, updateTodo } from '../../../store/slices/todoSlice';
import React, { useState } from 'react';
import { IconButton, Box, Paper, Typography, Input, Button, Stack, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';


interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    dispatch(updateTodo(updatedTodo));
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUpdatedTodo({ ...updatedTodo, [name]: value });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        marginBottom: '15px',
        width: '100%',
        padding: '15px 20px',
        borderRadius: 1,
        gap: 2,
        opacity: todo.checked ? 0.5 : 1,
      }}
    >
      {isEditing ? (
        <>
          <Stack direction='row' spacing={1}>
        <TextField value={updatedTodo.name} onChange={handleInputChange} name='name' label='name' fullWidth />
        <TextField
          value={updatedTodo.description}
          onChange={handleInputChange}
          name='description'
          label='description'
          fullWidth
        />
      </Stack>
      <Box textAlign='right' marginTop={2}>
        <Button startIcon={<SaveIcon />} variant='outlined' onClick={handleSaveClick}>
          {'Save'}
        </Button>
      </Box>
      </>
      ) : (
        <Box textAlign='left'>
          <Typography
            onClick={() => dispatch(toggleTodo(todo.id))}
            sx={{
              cursor: 'pointer',
              textDecorationLine: todo.checked ? 'line-through' : 'none',
            }}
            variant='h5'
            component='h5'
            gutterBottom
          >
            {todo.name}
          </Typography>
          <Typography variant='subtitle1' component='div' gutterBottom>
            {todo.description}
          </Typography>
        </Box>
      )}

      <Box display='flex' justifyContent='flex-end'>
        {isEditing ? (
          <></>
        ) : (
          <>
            <IconButton onClick={handleEditClick} color='primary' aria-label='edit'>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(deleteTodo(todo.id))} color='error' aria-label='delete'>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Paper>
  );
};