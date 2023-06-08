import HTTPTransport from "../../core/HTTPTransport";
import {ChatData} from "../../models";

export class ChatsAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport("/chats");
  }

  getChat() {
    return this.http.get("/", {});
  }

  createChat(title: string) {
    return this.http.post("/", {data: {title}});
  }

  deleteChat(id: number) {
    return this.http.delete("/", {data: {chatId: id}});
  }

  addUserToChat(data: {users: number[]; chatId: number}) {
    return this.http.put("/users", {data});
  }

  deleteUserFromChat(data: {users: number[]; chatId: number}) {
    return this.http.delete("/users", {data});
  }

  getToken(chatId: number) {
    return this.http.post(`/token/${chatId}`, {});
  }
  getChatUsers(id: number, data: ChatData) {
    return this.http.get(`/${id}/users`, {data});
  }
}
