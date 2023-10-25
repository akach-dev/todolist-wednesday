import React, {ChangeEvent, FC, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

interface ITaskProps {
  task: TaskType
  removeTask: (taskId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string) => void
  changeTaskStatus: (id: string, isDone: boolean) => void

}

export const Task: FC<ITaskProps> = memo(({task, changeTaskTitle, changeTaskStatus, removeTask}) => {

  const onClickHandler = () => removeTask(task.id)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    changeTaskStatus(task.id, newIsDoneValue);
  }
  const onTitleChangeHandler = (newValue: string) => {
    changeTaskTitle(task.id, newValue);
  }


  return <div className={task.isDone ? "is-done" : ""}>
    <Checkbox
       checked={task.isDone}
       color="primary"
       onChange={onChangeHandler}
    />

    <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
    <IconButton onClick={onClickHandler}>
      <Delete/>
    </IconButton>
  </div>
})
