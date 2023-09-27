import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import AppBar from '@mui/material/AppBar/AppBar';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {Menu} from "@mui/icons-material";
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todoListsReducer
} from "./state/todo-lists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./state/store";


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

  const dispatch = useDispatch()


  // const tasks = useSelector<AppRootType, TasksStateType>((state) => state.tasks)
  // const todoLists = useSelector<AppRootType, TodolistType[]>((state) => state.todoLists)
  const {todoLists, tasks} = useSelector<AppRootType,
     { todoLists: TodolistType[], tasks: TasksStateType }>((state) => state);

  /*  let todoListId1 = v1();
    let todolistId2 = v1();


    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
      {id: todoListId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
      [todoListId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
      ],
      [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
      ]
    });*/


  function removeTask(id: string, todolistId: string) {
    // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)});
    dispatch(removeTaskAC(id, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    /*let task = {id: v1(), title: title, isDone: false};
    setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]});*/
    dispatch(addTaskAC(title, todolistId))

  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    /*setTasks({
      ...tasks, [todolistId]: tasks[todolistId].map(task =>
         task.id === id ? {...task, isDone} : task
      )
    })*/
    dispatch(changeTaskStatusAC(id, isDone, todolistId))
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    /*  setTasks({
        ...tasks, [todolistId]: tasks[todolistId].map(task =>
           task.id === id ? {...task, newTitle} : task
        )
      })*/
    dispatch(changeTaskTitleAC(id, newTitle, todolistId))
  }

  function changeFilter(filter: FilterValuesType, todolistId: string) {
    // setTodoLists(todoLists.map(todoList => todoList.id === todolistId ? {...todoList, filter} : todoList))
    dispatch(ChangeTodolistFilterAC(todolistId, filter))
  }

  function removeTodolist(id: string) {
    /* // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
     setTodoLists(todoLists.filter(tl => tl.id != id));
     // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
     delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
     // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
     setTasks({...tasks});*/
    dispatch(RemoveTodolistAC(id))

  }

  function changeTodolistTitle(id: string, title: string) {
    // setTodoLists(todoLists.map(todoList => todoList.id === id ? {...todoList, title} : todoList))
    dispatch(ChangeTodolistTitleAC(id, title))

  }

  function addTodolist(title: string) {
    /*  let newTodolistId = v1();
      let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
      setTodoLists([newTodolist, ...todoLists]);
      setTasks({
        ...tasks,
        [newTodolistId]: []
      })*/
    dispatch(AddTodolistAC(title))

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
