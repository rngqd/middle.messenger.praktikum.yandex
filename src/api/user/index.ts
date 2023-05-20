import HTTPTransport from "../../core/HTTPTransport";
import {EditProfileData, EditProfilePassword, User} from "../../models";

export class UserAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/user");
  }

  getUser(id: string): Promise<User> {
    return this.http.get(`/${id}`, {});
  }

  editProfileData(data: EditProfileData) {
    return this.http.put("/profile", {data});
  }

  editProfilePassword(data: EditProfilePassword) {
    return this.http.put("/password", {data});
  }

  editProfileAvatar(data: FormData) {
    return this.http.put("/profile/avatar", {
      data,
      headers: {"Content-Type": "multipart/form-data"},
    });
  }

  searchUser(login: string) {
    return this.http.post("/search", {data: {login}});
  }
}
