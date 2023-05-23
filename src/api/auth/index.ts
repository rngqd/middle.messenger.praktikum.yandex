import HTTPTransport from "../../core/HTTPTransport";
import {LoginData, User, SignupData} from "../../models";

export class AuthAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/auth");
  }

  getUser() {
    return this.http.get("/user", {});
  }

  login(data: LoginData) {
    return this.http.post("/signin", {data});
  }

  signup(data: SignupData) {
    return this.http.post("/signup", {data});
  }

  logout() {
    return this.http.post("/logout", {});
  }
}
