import {AuthAPI} from "./index";
import {LoginData, SignupData} from "../../models";
import Router from "../../router";
import store from "../../store";
import { RouterPath } from "../../models/enums";

class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signin(data: LoginData) {
    try {
      await this.api.login(data);

      Router.go(RouterPath.chats);
    } catch (e: any) {
      alert("Ошибка при входе")
      console.log(e.reason);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();

      Router.go(RouterPath.chats);
    } catch (e: any) {
      alert("Ошибка при регистрации")
      console.log(e.reason);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.getUser();
      store.set("user", user);
      return user;
    } catch (e: any) {
      console.log(e.reason);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      Router.go(RouterPath.login);
    } catch (e: any) {
      console.log(e.reason);
    }
  }
}

export default new AuthController();
