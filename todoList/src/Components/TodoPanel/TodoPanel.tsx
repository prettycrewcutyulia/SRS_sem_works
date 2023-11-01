import React from 'react';
import { Add as AddIcon } from '@mui/icons-material';
import { TextField, Paper, Button, Box, Stack } from '@mui/material';
import { addTodo} from '../../store/slices/todoSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const DEFAULT_TODO = {id: 0, name: '', description: '' };

export const TodoPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = React.useState(DEFAULT_TODO);
  const todos = useSelector((state: RootState) => state.todo);
  todo.id = new Date().getTime();
  
  const onClick = () => {
    if (todo.name.trim() !== '') {
    dispatch(addTodo(todo));
    setTodo(DEFAULT_TODO);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <Paper
      elevation={1}
      sx={{
        marginBottom: '15px',
        width: '100%',
        padding: '15px 20px',
        borderRadius: 1,
        gap: 2
      }}
    >
      <Stack direction='row' spacing={1}>
        <TextField value={todo.name} onChange={onChange} name='name' label='name' fullWidth />
        <TextField
          value={todo.description}
          onChange={onChange}
          name='description'
          label='description'
          fullWidth
        />
      </Stack>
      <Box textAlign='right' marginTop={2}>
        <Button startIcon={<AddIcon />} variant='outlined' onClick={onClick}>
          {'ADD'}
        </Button>
      </Box>
    </Paper>
  );
};