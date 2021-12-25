import React from 'react';
import { styled } from '@mui/system';
import { OutlinedInputProps, TextField, TextFieldProps } from '@mui/material';

export const TransparentInput = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  width: '100%',
  padding: 0,
  margin: 0,
  '& .MuiTextField-root': {
    border: '1px solid transparent',
  },
  '& .MuiOutlinedInput-root': {
    border: '1px solid transparent',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      borderColor: 'transparent',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      display: 'none',
    },
  },
}));
