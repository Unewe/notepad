import axios from 'axios';
import { Note, NoteForm } from '../models/note.model';
import notes from '../store/notes.store';
import notesStore from '../store/notes.store';

class NotesService {
  get(): void {
    axios.get('/api/notes').then((value) => {
      notes.list = value.data;
    });
  }

  create(note: NoteForm): void {
    axios.post<Note>('/api/notes', note).then(
      (value) => notesStore.push(value.data),
      (reason) => {
        throw (
          Object.values(reason?.response?.data?.errors ?? {}).flat(
            Infinity
          )[0] || 'Что то пошло не так.'
        );
      }
    );
  }

  update(note: Note): void {
    axios.put<Note>('/api/notes', note).then(
      (_value) => notesStore.update(note),
      (reason) => {
        throw (
          Object.values(reason?.response?.data?.errors ?? {}).flat(
            Infinity
          )[0] || 'Что то пошло не так.'
        );
      }
    );
  }

  delete(id: number): void {
    axios
      .delete('/api/notes', { params: { id } })
      .then((_value) => notes.delete(id));
  }
}

export default new NotesService();
