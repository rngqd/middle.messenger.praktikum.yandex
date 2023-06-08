import {UserAPI} from "./index";
import store from "../../store";

import {EditProfileData, EditProfilePassword} from "../../models";

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async editProfile(data: EditProfileData) {
    try {
      const editData = await this.api.editProfileData(data);
      store.set("user", editData);

      alert("Данные профиля обновлены!");
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async editPassword(data: EditProfilePassword) {
    try {
      await this.api.editProfilePassword(data);

      // store.set("user", user);
      alert("Пароль обновлен!");
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async editAvatar(data: any) {
    try {
      const {avatar} = (await this.api.editProfileAvatar(data)) as {avatar: string};
      const {user} = store.getState();
      store.set("user", {...user, avatar});
      alert("Аватар обновлен!");
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async searchUser(login: string) {
    try {
      return await this.api.searchUser(login);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new UserController();
