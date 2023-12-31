import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {ButtonMemo} from "./ButtonMemo";
import {Task} from "./Task";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: FilterValuesType, todolistId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (id: string) => void
  changeTodolistTitle: (id: string, newTitle: string) => void
  filter: FilterValuesType
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
  console.log('Todolist')
  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, [props.addTask, props.id])

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  }

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])


  let tasks = props.tasks

  if (props.filter === "active") {
    tasks = tasks.filter(t => !t.isDone);
  }
  if (props.filter === "completed") {
    tasks = tasks.filter(t => t.isDone);
  }

  const removeTask = (taskId: string) => props.removeTask(taskId, props.id)
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    props.changeTaskStatus(taskId, isDone, props.id);
  }
  const changeTaskTitle = (taskId: string, newValue: string) => {
    props.changeTaskTitle(taskId, newValue, props.id);
  }


  return <div>
    <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        tasks.map(task => {
          return <Task task={task} removeTask={removeTask} changeTaskTitle={changeTaskTitle}

                       changeTaskStatus={changeTaskStatus}/>
        })
      }


    </div>
    <div style={{paddingTop: "10px"}}>
      <ButtonMemo variant={props.filter === 'all' ? 'outlined' : 'text'}
                  onClick={onAllClickHandler}
                  color={'inherit'}
      >All
      </ButtonMemo>
      <ButtonMemo variant={props.filter === 'active' ? 'outlined' : 'text'}
                  onClick={onActiveClickHandler}
                  color={'primary'}>Active
      </ButtonMemo>
      <ButtonMemo variant={props.filter === 'completed' ? 'outlined' : 'text'}
                  onClick={onCompletedClickHandler}
                  color={'secondary'}>Completed
      </ButtonMemo>
    </div>
  </div>
})