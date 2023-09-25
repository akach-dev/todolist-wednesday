import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC
} from "./state/todolists-reducer";


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
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoLists, dispatchToTodoListsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ])

  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "React Book", isDone: true}
    ]
  });


  function removeTask(id: string, todolistId: string) {
    dispatchToTasksReducer(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId))
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    dispatchToTasksReducer(changeTaskStatusAC(id, todolistId))

  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToTodoListsReducer(ChangeTodolistFilterAC(todolistId, value))
  }

  function removeTodolist(id: string) {
    dispatchToTodoListsReducer(RemoveTodolistAC(id))
    dispatchToTasksReducer(RemoveTodolistAC(id))
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatchToTodoListsReducer(ChangeTodolistTitleAC(id, title))

  }

  function addTodolist(title: string) {
    dispatchToTodoListsReducer(AddTodolistAC(title))
  }

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
               let allTodolistTasks = tasks[tl.id];
               let tasksForTodolist = allTodolistTasks;

               if (tl.filter === "active") {
                 tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
               }
               if (tl.filter === "completed") {
                 tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
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

export default AppWithRedux;