import axios from "axios";
import {LoginForm, User} from "../models/user";
import authentication from "../store/authentication";

class UsersService {
  static readonly tokenKey = "notepad_api_token";

  constructor() {
    const token = localStorage.getItem(UsersService.tokenKey);
    if (token) {
      UsersService.applyToken(token)
    }

    axios.interceptors.response.use(response => response, error => {
      // Если приходит ошибка "Отказано в доступе" - то разлогиниваем пользователя.
      // Пусть регается заново!
      error.response === 403 && this.logout();
      return Promise.reject(error);
    });
  }

  login(data: LoginForm) {
    return axios.post<Required<Pick<LoginForm, "id" | "username" | "token">>>(
      "/api/users/login/",
      {user: data}).then(value => {
      value.data.token && UsersService.applyToken(value.data.token);
      authentication.user = new User(value.data.id, value.data.username);
    }, reason => {
      this.logout();
      throw reason.response.data.errors.error;
    });
  }

  logout() {
    axios.defaults.headers.common = {};
    authentication.user = undefined;
    localStorage.removeItem(UsersService.tokenKey);
  }

  private static applyToken(token: string) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    localStorage.setItem(UsersService.tokenKey, token);
  }
}

export default new UsersService();