import React, {ChangeEvent, FC} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";

interface TaskPropsType {

  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
  taskId: string
  todoListId: string
  isDone: boolean
  title: string
}

export const Task: FC<TaskPropsType> = (props) => {
  const onClickHandler = () => props.removeTask(props.taskId, props.todoListId)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(props.taskId, newIsDoneValue, props.todoListId);
  }
  const onTitleChangeHandler = (newValue: string) => {
    props.changeTaskTitle(props.taskId, newValue, props.todoListId);
  }


  return <div key={props.taskId} className={props.isDone ? "is-done" : ""}>
    <Checkbox
       checked={props.isDone}
       color="primary"
       onChange={onChangeHandler}
    />

    <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>

};