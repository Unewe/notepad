import { makeAutoObservable } from 'mobx';

class Notes {
  private _list: Array<Notes> = [];
  private _editId?: number;

  constructor() {
    makeAutoObservable(this);
  }

  get list(): Array<Notes> {
    return this._list;
  }

  set list(value: Array<Notes>) {
    this._list = value;
  }

  get editId(): number | undefined {
    return this._editId;
  }

  set editId(value: number | undefined) {
    this._editId = value;
  }
}

export default new Notes();
