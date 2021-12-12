export class User {
  id: number = -1;
  username: string = "";

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}

export class LoginForm {
  id?: number;
  username?: string;
  password?: string;
  token?: string;
}

export type LoginRequest = Required<Pick<LoginForm, "username" | "password">>;
export type LoginResponse = Required<Pick<LoginForm, "id" | "username" | "token">>;