import React, { FormEvent, useEffect, useState } from 'react';
import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/material';
import { Note } from '../../models/note';
import NotesService from '../../services/notes';
import DeleteIcon from '@mui/icons-material/Delete';
import { NotePaper } from '../../components/note-paper/NotePaper';

export const Notes: React.FC = (): React.ReactElement => {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    NotesService.get().then((value) => setNotes(value));
  }, []);

  const handleChange = (event: FormEvent<HTMLDivElement>, note: Note) => {
    const text: string = (event.target as HTMLDivElement).innerHTML;
    if (note.text !== text) {
      NotesService.update({ ...note, text });
    }
  };

  const addEmpty = () => {
    NotesService.create({
      text: '',
      backgroundColor: '',
      color: '',
      label: '',
    });
  };

  const deleteNote = ({ id }: Note) => {
    NotesService.delete(id);
  };

  return (
    <Container sx={{ pt: 5 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={1}>
        {notes.map((note) => (
          <Box
            key={note.id}
            sx={{
              position: 'relative',
              '&:hover': {
                '.MuiSvgIcon-root': { display: 'block' },
              },
            }}
          >
            <DeleteIcon
              onClick={() => deleteNote(note)}
              sx={{
                position: 'absolute',
                right: '-10px',
                top: '-10px',
                display: 'none',
                '&:hover': {
                  color: 'red',
                  cursor: 'pointer',
                },
              }}
            />
            <NotePaper
              spellCheck={false}
              contentEditable={true}
              key={note.id}
              suppressContentEditableWarning={true}
              onBlur={(event) => handleChange(event, note)}
              onPaste={(event) => event.preventDefault()}
              sx={{
                color: note.color || 'black',
                backgroundColor: note.backgroundColor || 'white',
                overflow: 'scroll',
              }}
            >
              {note.text}
            </NotePaper>
          </Box>
        ))}
        <NotePaper onClick={addEmpty} sx={{ backgroundColor: '#7fc9ff' }}>
          +
        </NotePaper>
      </Masonry>
    </Container>
  );
};
