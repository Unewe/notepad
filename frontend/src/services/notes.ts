import axios from "axios";
import {Note, NoteForm} from "../models/note";

class Notes {
  get(): Promise<Array<Note>> {
    return axios.get("/api/notes").then(value => value.data);
  }

  create(note: NoteForm): Promise<Note> {
    return axios.post<Note>("/api/notes", note).then(
      value => value.data,
      reason => {
        throw Object.values(reason?.response?.data?.errors ?? {}).flat(Infinity)[0] || "Что то пошло не так.";
      });
  }

  update(note: Note): Promise<Note> {
    return axios.put<Note>("/api/notes", note).then(
      value => value.data,
      reason => {
        throw Object.values(reason?.response?.data?.errors ?? {}).flat(Infinity)[0] || "Что то пошло не так.";
      });
  }

  delete(id: number): void {
    axios.delete("/api/notes", {params: {id}}).then();
  }
}

export default new Notes();