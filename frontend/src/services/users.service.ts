import axios from 'axios';
import { LoginResponse, User, LoginRequest } from '../models/user.model';
import authenticationStore from '../store/authentication.store';
import NotesService from './notes.service';
import notesStore from '../store/notes.store';

class UsersService {
  static readonly tokenKey = 'notepad_api_token';

  constructor() {
    const token = localStorage.getItem(UsersService.tokenKey);
    if (token) {
      UsersService.applyToken(token);
      this.current();
    }

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Если приходит ошибка "Отказано в доступе"
        // - то разлогиниваем пользователя.
        // Пусть регается заново!
        error.response.status === 403 && this.logout();
        return Promise.reject(error);
      }
    );
  }

  current(): void {
    axios.get<LoginResponse>('api/users/current').then(
      (value) => {
        authenticationStore.user = new User(value.data.id, value.data.username);
        NotesService.get();
        return value.data;
      },
      (reason) => {
        this.logout();
        throw (
          Object.values(reason?.response?.data?.errors ?? {}).flat(
            Infinity
          )[0] || 'Что то пошло не так.'
        );
      }
    );
  }

  login(data: LoginRequest): Promise<LoginResponse> {
    return this.handleLoginOrRegister('/api/users/login', data);
  }

  register(data: LoginRequest): Promise<LoginResponse> {
    return this.handleLoginOrRegister('api/users', data);
  }

  private handleLoginOrRegister(
    api: string,
    data: LoginRequest
  ): Promise<LoginResponse> {
    return axios.post<LoginResponse>(api, data).then(
      (value) => {
        value.data.token && UsersService.applyToken(value.data.token);
        authenticationStore.user = new User(value.data.id, value.data.username);
        NotesService.get();
        return value.data;
      },
      (reason) => {
        this.logout();
        throw (
          Object.values(reason?.response?.data?.errors ?? {}).flat(
            Infinity
          )[0] || 'Что то пошло не так.'
        );
      }
    );
  }

  logout(): void {
    axios.defaults.headers.common = {};
    authenticationStore.user = undefined;
    notesStore.list = [];
    localStorage.removeItem(UsersService.tokenKey);
  }

  private static applyToken(token: string): void {
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
    localStorage.setItem(UsersService.tokenKey, token);
  }
}

export default new UsersService();
