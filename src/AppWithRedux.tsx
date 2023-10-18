import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


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
  // let todolistId1 = v1();
  // let todolistId2 = v1();
  //
  // let [todolists, dispatchToTodoList] = useReducer<Reducer<TodolistType[], any>>(todolistsReducer, [
  //   {id: todolistId1, title: "What to learn", filter: "all"},
  //   {id: todolistId2, title: "What to buy", filter: "all"}
  // ])
  // let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
  //   [todolistId1]: [
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true}
  //   ],
  //   [todolistId2]: [
  //     {id: v1(), title: "Milk", isDone: true},
  //     {id: v1(), title: "React Book", isDone: true}
  //   ]
  // });


  const dispatch = useDispatch()

  const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
  // const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)


  const removeTask = (id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId))
  };

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId))
  };

  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  };

  const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(id, newTitle, todolistId))
  };


  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC(todolistId, value))
  };

  const removeTodolist = (id: string) => {
    dispatch(removeTodolistAC(id))

  };

  const changeTodolistTitle = (id: string, title: string) => {
    dispatch(changeTodolistTitleAC(id, title))

  };

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  };

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
             todolists.map(tl => {


               return <Grid key={tl.id} item>
                 <Paper style={{padding: "10px"}}>
                   <Todolist
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
