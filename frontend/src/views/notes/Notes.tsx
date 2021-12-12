import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import {Container} from "@mui/material";
import {Note} from "../../models/note";
import NotesService from "../../services/notes";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: '1px solid black',
  padding: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Notes: React.FC = (): React.ReactElement => {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    NotesService.get().then(value => setNotes(value))
  })

  return (
    <Container sx={{pt: 5}}>
      <Masonry columns={4} spacing={1}>
        {notes.map((note) => (
          <Item key={note.id} sx={{ backgroundColor: note.color }}>
            {note.text}
          </Item>
        ))}
      </Masonry>
    </Container>
  )
}

