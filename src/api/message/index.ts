import store from "../../store";
import {SOCKET_API_URL} from "../../utils/constants";

export interface Socket {
  userId: number;
  chatId: number;
  token: string;
}

export class MessageSocket {
  private _webSocket: WebSocket;
  private _chatId: number;
  private _userId: number;
  private _ping: any;
  private _token: string;

  private _addEventListeners() {
    this._webSocket.addEventListener("open", this._handleOpen);
    this._webSocket.addEventListener("close", this._handleClose);
    this._webSocket.addEventListener("message", this._handleMassage);
    this._webSocket.addEventListener("error", this._handleError);
  }

  private _removeEventListeners() {
    this._webSocket.removeEventListener("open", this._handleOpen);
    this._webSocket.removeEventListener("close", this._handleClose);
    this._webSocket.removeEventListener("message", this._handleMassage);
    this._webSocket.removeEventListener("error", this._handleError);
  }

  private readonly _handleOpen = () => {
    this.getMessages(0);
    this._ping = setInterval(() => {
      this._webSocket.send(
        JSON.stringify({
          type: "ping",
        }),
      );
    }, 50000);
  };

  private readonly _handleClose = (e: CloseEventInit) => {
    this._removeEventListeners();
    if (e.code === 1006) {
      this._reconnect();
    }

    if (e.wasClean) {
      console.log("Соединение закрыто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${e.code} | Причина: ${e.reason}`);
  };

  private readonly _handleMassage = (e: MessageEvent) => {
    let data
    try {
      data = JSON.parse(e.data);
    } catch (e) {
      data = undefined
    }

    if (Array.isArray(data)) {
      if (!data.length) {
        store.set("messages", []);
      } else if (data[0].id === 0) {
        store.set("messages", data);
      } else {
        const messages = [...data];

        store.set("messages", messages);
      }
    } else if (typeof data === "object" && data.type === "message") {
      const messages = [data, ...store.getState().messages];
      store.set("messages", messages);
    }
  };

  private readonly _handleError = (e: Event) => {
      console.log(e);
  };

  private _reconnect() {
    this.connect({
      token: this._token,
      userId: this._userId,
      chatId: this._chatId,
    });
  }

  public getMessages(offset: number) {
    this._webSocket.send(
      JSON.stringify({
        content: offset.toString(),
        type: "get old",
      }),
    );
  }

  public connect(options: Socket) {
    this._chatId = options.chatId;
    this._userId = options.userId;
    this._token = options.token;

    this._webSocket = new WebSocket(`${SOCKET_API_URL}${options.userId}/${options.chatId}/${options.token}`);

    this._addEventListeners();
  }

  public exit() {
    clearInterval(this._ping);
    this._webSocket.close();
    this._removeEventListeners();
  }

  public sendMessage(message: string) {
    this._webSocket.send(
      JSON.stringify({
        content: message,
        type: "message",
      }),
    );
  }
}

export default new MessageSocket();
