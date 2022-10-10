import Block from "../../utils/Block";

import "./chat.sass";

interface ChatProps {
 avatar?: string;
 name: string;
 message?: string;
 time: string;
 count?: number;
 onClick: () => void;
}

export class Chat extends Block {
 static componentName = "Chat";
 constructor({avatar, name, message, time, count, onClick}: ChatProps) {
  super({avatar, name, message, time, count, onClick, events: {click: onClick}});
 }

 protected render(): string {
  // language=hbs
  return `
            <div class="chat">
                <img class="chat__avatar"  alt="avatar" src="{{avatar}}">
                <div class="chat__container chat__container_text">
                    <p class="chat__profile-name">{{name}}</p>
                    <p class="chat__message">{{message}}</p>
                </div>
                <div class="chat__container chat__container_data">
                    <time class="chat__time">{{time}}</time>
                    <p class="chat__message-count">{{count}}</p>
                </div>
            </div>
    `;
 }
}
