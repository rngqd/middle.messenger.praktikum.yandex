import Block from "../../core/Block";
import ChatController from "../../api/chats/controller";
import MessageSocket from "../../api/message";
import "./dialogue.sass";
import {RESOURCE_URL} from "../../utils/constants";
import store from "../../store";
import {ChatData} from "../../models";

const avatarImg = require("../../../static/img/avatar.jpeg");

interface DialogueProps {
  avatar?: string;
  title?: string;
  activeChatId?: number;
  messages?: string[];
}

export class Dialogue extends Block {
  static componentName = "Dialogue";
  constructor(props: DialogueProps) {
    super(props);
    this.setProps({
      onDeleteChat: async () => {
        await ChatController.deleteChat(this.props.activeChatId);
        store.set("activeChat", null);
      },
      onOpenAddModal: () => {
        const modal = document.querySelector(".modal_add-user") as HTMLElement;
        modal.classList.add("modal_visible");
      },
      onAddUser: async (e: Event) => {
        e.preventDefault();
        const userId = document.getElementById("modal__input-add") as HTMLInputElement;
        await ChatController.addUser({users: [+userId.value], chatId: this.props.dialogueID});
        await ChatController.getChatUsers(this.props.dialogueID, {} as ChatData);
      },
      onOpenDeleteModal: () => {
        const modal = document.querySelector(".modal_delete-user") as HTMLElement;
        modal.classList.add("modal_visible");
      },
      onDeleteUser: async (e: Event) => {
        e.preventDefault();
        const userId = document.getElementById("modal__input-delete") as HTMLInputElement;
        await ChatController.deleteUser({users: [+userId.value], chatId: this.props.dialogueID});
        await ChatController.getChatUsers(this.props.dialogueID, {} as ChatData);
      },
      onSendMessage: (e: Event) => {
        e.preventDefault();
        const input = document.getElementById("message") as HTMLInputElement;
        if (input) {
          const value = input.value;

          MessageSocket.sendMessage(value);
        }
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="dialogue">
            <div class="dialogue__header">
                <div class="dialogue__header-container">
                    <img class="dialogue__header-avatar"
                        {{#if avatar}}
                          src="${RESOURCE_URL}{{src}}"
                        {{else}}
                          src=${avatarImg}
                        {{/if}}
                         alt="chat-avatar">
                    <span class="dialogue__header-name">{{title}}</p>
                </div>
               {{{Button title="Удалить чат" onClick=onDeleteChat}}}
               {{{Button title="Добавить пользователя" onClick=onOpenAddModal}}}
               {{{Button title="Удалить пользователя"  onClick=onOpenDeleteModal}}}
            </div>
            <div class="dialogue__content">
                    {{#each messages}}
                        {{{DialogueMessage content=content userId=user_id}}}
                    {{/each}}
            </div>
            <div class="dialogue__footer">
                <button class="dialogue__footer-clip"></button>
                {{#Form onSubmit=onSendMessage className="dialogue__form"}}
                {{{Input
                                  type="text"
                                  name="message"
                                  id="message"
                                  className="dialogue__footer-input"
                                  placeholder="Сообщение"
                }}}
                {{{Button className="dialogue__footer-send" type="submit"}}}
                {{/Form}}
            </div>
            {{#Modal className="modal_add-user"}}
                {{#Form onSubmit=onAddUser}}
                    <h2 class="modal__title">ID пользователя</h2>
                    {{{ InputContainer
                            className="modal__input-chats"
                            id="modal__input-add"
                            type="text"
                            name="add"
                            id="add"
                    }}}
                    {{{Button
                            className="modal__btn-change"
                            title="Добавить пользователя"
                            type="submit"
                    }}}
                {{/Form}}
            {{/Modal}}
            {{#Modal className="modal_delete-user"}}
                {{#Form onSubmit=onDeleteUser}}
                  <h2 class="modal__title">ID пользователя</h2>
                  {{{ InputContainer
                          className="modal__input-chats"
                          id="modal__input-delete"
                          type="text"
                          name="delete"
                          id="delete"
                  }}}
                  {{{Button
                          className="modal__btn-change"
                          title="Удалить пользователя"
                          type="submit"
                  }}}
                {{/Form}}
            {{/Modal}}
        </div>
    `;
  }
}
