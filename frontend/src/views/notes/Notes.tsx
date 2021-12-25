import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { Box, Container } from '@mui/material';
import { Note } from '../../models/note.model';
import NotesService from '../../services/notes.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { NotePaper } from '../../components/note-paper/NotePaper';
import notes from '../../store/notes.store';
import { observer } from 'mobx-react-lite';
import { TransparentInput } from '../../components/input/input-transparent';
import notesStore from '../../store/notes.store';

export const Notes: React.FC = observer((): React.ReactElement => {
  const submit = (note: Note) => {
    NotesService.update(note);
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    note: Note
  ) => {
    const text: string = event.target.value;
    if (note.text !== text) {
      notesStore.update({ ...note, text });
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
        {notes.list.map((note) => (
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
                zIndex: 10,
                '&:hover': {
                  color: 'red',
                  cursor: 'pointer',
                },
              }}
            />
            <NotePaper
              key={note.id}
              sx={{
                color: note.color || 'black',
                backgroundColor: note.backgroundColor || 'white',
                overflow: 'scroll',
                position: 'relative',
              }}
            >
              <TransparentInput
                onBlur={() => submit(note)}
                onChange={(event) => onChange(event, note)}
                multiline
                value={note.text}
              />
            </NotePaper>
          </Box>
        ))}
        <NotePaper onClick={addEmpty} sx={{ backgroundColor: '#7fc9ff' }}>
          +
        </NotePaper>
      </Masonry>
    </Container>
  );
});
