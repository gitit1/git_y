import { Button } from '@mui/material';
import React, { RefObject } from 'react';
import './YButton.scss';

interface YButtonProps {
  label: string;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  fullWidth?: boolean;
  disabled?: boolean;
  component?: React.ElementType;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'>;
  inputRef?: RefObject<HTMLInputElement>;
}

const YButton: React.FC<YButtonProps> = ({
  label,
  onClick,
  startIcon,
  color = 'primary',
  fullWidth = false,
  disabled = false,
  component = 'button',
  inputProps,
  inputRef,
}) => {
  return (
    <Button
      className={`y-button ${fullWidth ? 'full-width' : ''} ${disabled ? 'disabled' : ''}`}
      variant="contained"
      color={color}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      component={component}
    >
      {startIcon}
      {label}
      {inputProps && <input {...inputProps} ref={inputRef} hidden />}
    </Button>
  );
};

export default YButton;