import React, {FC, memo} from 'react';
import {ButtonProps} from "@mui/material/Button/Button";
import {Button} from "@mui/material";

interface ButtonMemoPropsType extends ButtonProps {
  children: React.ReactNode
}

export const ButtonMemo: FC<ButtonMemoPropsType> = memo(({children, ...rest}) => {
  return <Button {...rest}>{children}</Button>
})
