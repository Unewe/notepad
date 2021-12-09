import axios from "axios";
import {LoginForm} from "../models/user";
import authentication from "../store/authentication";

class UsersService {
  login(data: LoginForm) {
    axios.post("/api/users/login/", {user: data}).then(_value => {
      authentication.open = false;
      console.log(data);
    })
  }
}

export default new UsersService();