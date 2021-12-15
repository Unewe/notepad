import { makeAutoObservable } from 'mobx';
import { Note } from '../models/note.model';

class NotesStore {
  private _list: Array<Note> = [];
  private _editId?: number;

  constructor() {
    makeAutoObservable(this);
  }

  get list(): Array<Note> {
    return this._list;
  }

  set list(value: Array<Note>) {
    this._list = value;
  }

  get editId(): number | undefined {
    return this._editId;
  }

  set editId(value: number | undefined) {
    this._editId = value;
  }

  push(note: Note): void {
    this.list = [...this.list, note];
  }

  update(text: string): void {
    const note = this._list.find((value) => value.id === this._editId);

    if (note) {
      const tmp = [...this.list];
      tmp[this._list.indexOf(note)] = { ...note, text };

      this.list = tmp;
    }
  }

  delete(id: number): void {
    const tmp = [...this.list];
    tmp.splice(
      tmp.findIndex((value) => value.id === id),
      1
    );

    this.list = tmp;
  }
}

export default new NotesStore();
