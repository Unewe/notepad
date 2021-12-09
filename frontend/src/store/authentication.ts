import {User} from "../models/user";
import {makeAutoObservable} from "mobx";

class AuthenticationStore {
  private _open = false;
  private _user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  get open() {
    return this._open;
  }

  set open(value) {
    this._open = value;
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }
}

export default new AuthenticationStore();