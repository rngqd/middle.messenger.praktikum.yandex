import Block from "../../core/Block";
import avatarImg from "../../../static/img/avatar.jpeg";
import store, {withStore} from "../../store";
import ChatController from "../../api/chats/controller";
import MessageSocket from "../../api/message";
import {ChatData} from "../../models";

import "./chat.sass";
import {RESOURCE_URL} from "../../utils/constants";
import {formatDate} from "../../utils/functions";

interface ChatProps {
  avatar?: string;
  name: string;
  message?: string;
  time: string;
  count?: number;
  isAnswer: boolean;
  onClick: () => void;
}

export class ChatBase extends Block {
  static componentName = "Chat";
  constructor({onClick, ...props}: ChatProps) {
  
    super({...props, events: {click: (e: Event) => this.onSelectChat(e)}});
    console.log(props)
    this.setProps({
      time: this.props.time ? formatDate(this.props.time) : "",
      isActiveChat: this.props.id === this.props.activeChat,
    });
  }
  async onSelectChat(e: Event) {
    const target = e.currentTarget as HTMLDivElement;

    const chatId = Number(target.id);
    store.set("activeChat", {id: this.props.id, title: this.props.name});
    await ChatController.getChatUsers(chatId, {} as ChatData);
    const token = await ChatController.getChatToken(chatId);

    if (token) {
      const userId = store.getState().user.id;

      MessageSocket.connect({userId, chatId, token: token.token});
    }
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="chat {{#if isActiveChat}} chat_selected{{/if}}" id="{{id}}">
                <img class="chat__avatar"  alt="avatar"
                    {{#if avatar}}
                     src="${RESOURCE_URL}{{avatar}}"
                      {{else}}
                      src=${avatarImg}
                    {{/if}}>
                <div class="chat__container chat__container_text">
                    <p class="chat__profile-name">{{name}}</p>
                    <p class="chat__message">{{message}}</p>
                </div>
                <div class="chat__container chat__container_data">
                    <time class="chat__time">{{time}}</time>
                 {{#if count}}
                    <p class="chat__message-count">{{count}}</p>
                 {{/if}}
                </div>
            </div>
    `;
  }
}
export const withActiveChat = withStore(state => ({activeChat: state.activeChat}));

export const Chat = withActiveChat(ChatBase);
