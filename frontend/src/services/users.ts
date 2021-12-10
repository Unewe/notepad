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
  }

  login(data: LoginForm) {
    return axios.post<{user: LoginForm}>("/api/users/login/", {user: data}).then(value => {
      authentication.open = false;
      value.data.user.token && UsersService.applyToken(value.data.user.token);
      authentication.user = new User();
    });
  }

  private static applyToken(token: string) {
    console.log(token);
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
    localStorage.setItem(UsersService.tokenKey, token);
  }
}

export default new UsersService();