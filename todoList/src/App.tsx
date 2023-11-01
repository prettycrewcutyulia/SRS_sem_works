import { Header } from './Components/Header/Header';
import { TodoList } from './Components/TodoList/TodoList';
import { Box } from '@mui/material';
import { TodoPanel } from './Components/TodoPanel/TodoPanel';

export const App = () => {
  return (
    <Box marginTop={5} height='100%' display='flex' justifyContent='center' alignContent='center'>
      <Box display='flex' flexDirection='column' width='500px'>
        <Header/>
        <TodoPanel/>
        <TodoList/>
      </Box>
    </Box>
  );
};

export default App;
