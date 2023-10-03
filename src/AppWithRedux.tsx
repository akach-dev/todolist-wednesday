import React, {Reducer, useCallback, useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
  ActionsTypeForTodoList, addTodolistAC,
  changeTodolistFilterAC, changeTodolistTitleAC,
  removeTodolistAC,
  todoListsReducer
} from "./state/todo-lists-reducer";
import {
  ActionsTypeForTasks,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithOutProps} from "./TodolistWithOutProps";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}


export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {

  const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todoLists)
  const dispatch = useDispatch()


  const addTodolist = useCallback((title: string) => {
    let action = addTodolistAC(title)
    dispatch(action)
  }, [])

  return (

     <div className="App">
       <AppBar position="static">
         <Toolbar>
           <IconButton edge="start" color="inherit" aria-label="menu">
             <Menu/>
           </IconButton>
           <Typography variant="h6">
             News
           </Typography>
           <Button color="inherit">Login</Button>
         </Toolbar>
       </AppBar>
       <Container fixed>
         <Grid container style={{padding: "20px"}}>
           <AddItemForm addItem={addTodolist}/>
         </Grid>
         <Grid container spacing={3}>
           {
             todoLists.map(tl => {
               return <Grid key={tl.id} item>
                 <Paper style={{padding: "10px"}}>
                   <TodolistWithOutProps
                      todoList={tl}
                   />
                 </Paper>
               </Grid>
             })
           }
         </Grid>
       </Container>
     </div>
  );
}

export default AppWithRedux;
