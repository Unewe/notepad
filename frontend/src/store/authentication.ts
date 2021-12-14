import { User } from '../models/user';
import { makeAutoObservable } from 'mobx';

class AuthenticationStore {
  private _authModal = false;
  private _registrationModal = false;
  private _user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get authModal(): boolean {
    return this._authModal;
  }

  set authModal(value: boolean) {
    this._authModal = value;
  }

  get registrationModal(): boolean {
    return this._registrationModal;
  }

  set registrationModal(value: boolean) {
    this._registrationModal = value;
  }
}

export default new AuthenticationStore();
