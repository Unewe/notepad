import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const NotePaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: '1px solid black',
  padding: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
