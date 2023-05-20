import Block from "../../core/Block";
import avatarImg from "../../../static/img/avatar.jpeg";
import ChatController from "../../api/chats/controller";
import MessageSocket from "../../api/message";
import "./dialogue.sass";
import {RESOURCE_URL} from "../../utils/constants";
import store from "../../store";
import {ChatData} from "../../models";
interface DialogueProps {
  avatar?:string,
  title?: string,
  activeChatId?: number,
  messages?: string[]
}

export class Dialogue extends Block{
  static componentName = "Dialogue";
  constructor(props: DialogueProps) {
    super(props)
    this.setProps({
      onDeleteChat: async () => {
        await ChatController.deleteChat(this.props.activeChatId);
        store.set("activeChat", null)
      },
      onAddUserModal: async () => {
        this.refs.dialogueAddModal.setProps({
          isOpen: true
        })
      },
      onDeleteUserModal: async () => {
        this.refs.dialogueDeleteModal.setProps({
          isOpen: true
        })
      },
      onSendMessage: () => {
        const input = document.getElementById("message") as HTMLInputElement;
        if (input) {
          const value = input.value;
  
          MessageSocket.sendMessage(value);
        }
      },
      onAddUser: async (userId: number[]) => {
        await ChatController.addUser({users: userId, chatId: this.props.activeChatId});
        await ChatController.getChatUsers(this.props.activeChatId, {} as ChatData);
      },
      onDeleteUser: async (userId: number[]) => {
        await ChatController.deleteUser({users: userId, chatId: this.props.activeChatId});
        await ChatController.getChatUsers(this.props.activeChatId, {} as ChatData);
      },
      onCloseModal: ()=> {
        this.refs.dialogueAddModal.setProps({
          isOpen: false
        })
        this.refs.dialogueDeleteModal.setProps({
          isOpen: false
        })
      },
    })
    console.log(this.props)
  }
  
  protected render(): string {
    // language=hbs
    return `
            <div class="chats-page__chat">
                <div class="chats-page__header">
                    <div class="chats-page__header-container">
                        <img class="chats-page__header-avatar"
                            {{#if avatar}}
                              src="${RESOURCE_URL}{{src}}"
                            {{else}}
                              src=${avatarImg}
                            {{/if}}
                             alt="chat-avatar">
                        <span class="chats-page__header-name">{{title}}</p>
                    </div>
                   {{{Button title="Удалить чат" onClick=onDeleteChat}}}
                   {{{Button title="Добавить пользователя" onClick=onAddUserModal}}}
                   {{{Button title="Удалить пользователя"  onClick=onDeleteUserModal}}}
                </div>
                <div class="chats-page__content">
                    {{#each messages}}
                        {{{DialogueMessage content=content userId=user_id}}}
                    {{/each}}
                </div>
                <div class="chats-page__footer">
                    <button class="chats-page__footer-clip"></button>
                    {{{Input
                                      type="text"
                                      name="message"
                                      id="message"
                                      className="chats-page__footer-input"
                                      placeholder="Сообщение"
                    }}}
                    {{{Button className="chats-page__footer-send" onClick=onSendMessage}}}
                </div>
                {{{Modal
                        isOpen=isOpen
                        ref="dialogueDeleteModal"
                        onClose=onCloseModal
                        dialogueDeleteMode=true
                        dialogueID=activeChatId
                }}}
                {{{Modal
                        isOpen=isOpen
                        ref="dialogueAddModal"
                        onClose=onCloseModal
                        dialogueAddMode=true
                        dialogueID=activeChatId
                }}}
            </div>
        `
  }
}
