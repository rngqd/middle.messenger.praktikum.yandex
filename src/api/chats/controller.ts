import {ChatsAPI} from "./index";
import {ChatData} from "../../models";
import store from "../../store";

export class ChatController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async createChat(title: string) {
    try {
      await this.api.createChat(title);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async addUser(data: {users: number[]; chatId: number}) {
    try {
      await this.api.addUserToChat(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteUser(data: {users: number[]; chatId: number}) {
    try {
      await this.api.deleteUserFromChat(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async getChatToken(chatId: number) {
    try {
      return await this.api.getToken(chatId);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async getChatUsers(id: number, data: ChatData) {
    try {
      const usersInChat = await this.api.getChatUsers(id, data);

      store.set("messages", []);
      store.set("activeChat", id);
      store.set("createChat", "");
      store.set("usersInChat", usersInChat);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.getChat();
      store.set("chats", chats);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new ChatController();
