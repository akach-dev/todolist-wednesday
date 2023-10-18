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


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodoList] = useReducer<Reducer<TodolistType[], any>>(todolistsReducer, [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])
  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  });


  const removeTask = (id: string, todolistId: string) => {
    dispatchToTasks(removeTaskAC(id, todolistId))
  };

  const addTask = (title: string, todolistId: string) => {
    dispatchToTasks(addTaskAC(title, todolistId))
  };

  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
  };

  const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId))
  };


  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    dispatchToTodoList(changeTodolistFilterAC(todolistId, value))
  };

  const removeTodolist = (id: string) => {
    const action = removeTodolistAC(id)
    dispatchToTodoList(action)
    dispatchToTasks(action)

  };

  const changeTodolistTitle = (id: string, title: string) => {
    dispatchToTodoList(changeTodolistTitleAC(id, title))

  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)
    dispatchToTodoList(action)
    dispatchToTasks(action)
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
               let allTodolistTasks = tasks[tl.id];
               let tasksForTodolist = allTodolistTasks;

               if (tl.filter === "active") {
                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
               }
               if (tl.filter === "completed") {
                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
               }

               return <Grid key={tl.id} item>
                 <Paper style={{padding: "10px"}}>
                   <Todolist
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodolistTitle={changeTodolistTitle}
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

export default AppWithReducers;
