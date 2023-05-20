import Block from "../../core/Block";
import UserController from "../../api/user/controller";
import ChatController from "../../api/chats/controller";
import {returnFormData} from "../../utils/functions";
import "./modal.sass";
import {ChatData} from "../../models";

interface ModalProps {
  isOpen?: boolean,
  onClose?: () => void,
  onClick?: () => void,
  avatarMode?: boolean,
  chatMode?:boolean,
  dialogueAddMode?:boolean,
  dialogueDeleteMode?:boolean,
  dialogueID?: number
}

export class Modal extends Block {
  static componentName = "Modal";
  constructor({onClose, onClick, ...props}: ModalProps) {
    super({onClose, onClick, ...props});
    this.setProps({
      onChangeAvatar:() => {
        const avatar = document.getElementById("modal__input-file") as HTMLInputElement;
        const file = (avatar as any).files[0]
        const formData = new FormData();
        if (avatar && file) {
          formData.append("avatar", (avatar as any).files[0]);
          void UserController.editAvatar(formData);
        }
      },
      onCreateChat:() => {
        const data = returnFormData("modal__form");
        if(data?.chats) {
          void ChatController.createChat(data.chats as string);
        }
      },
      onBrowseFile: () => {
        document.getElementById("modal__input-file")?.click();
      },
      onAddUser: async () => {
        const userId = document.getElementById("modal__input-add") as HTMLInputElement;
        await ChatController.addUser({users: [+userId.value], chatId: this.props.dialogueID});
        await ChatController.getChatUsers(this.props.dialogueID, {} as ChatData);
    },
      onDeleteUser: async () => {
        const userId = document.getElementById("modal__input-delete") as HTMLInputElement;
        await ChatController.deleteUser({users: [+userId.value], chatId: this.props.dialogueID});
        await ChatController.getChatUsers(this.props.dialogueID, {} as ChatData);
      }
    })
  }
  
  protected render(): string {
    // language=hbs
    return `
          {{#if isOpen}}
              <div class="modal">
                  <div class="modal__container">
                      {{{Button className="modal__close" onClick=onClose}}}
                      <form id="modal__form">
                      {{#if avatarMode}}
                          <p class="modal__title">Загрузить файл</p>
                          {{{ InputContainer
                                className="modal__input-file"
                                id="modal__input-file"
                                type="file"
                                name="avatar"
                                id="avatar"
                        }}}
                        {{{ Button
                                title="Выберите файл на компьютере"
                                onClick=onBrowseFile
                                className="modal__input-file_helper"
                        }}}
                        {{{Button onClick=onChangeAvatar title="Изменить" className="modal__btn-change"}}}
                      {{/if}}
                      
                      {{#if chatMode}}
                          <h2 class="modal__title">Создать чат</h2>
                          {{{ InputContainer
                                  className="modal__input-chats"
                                  id="modal__input-text"
                                  type="text"
                                  name="chats"
                                  id="chats"
                          }}}
                          {{{Button onClick=onCreateChat title="Создать" className="modal__btn-change"}}}
                      {{/if}}

                      {{#if dialogueAddMode}}
                          <h2 class="modal__title">ID пользователя</h2>
                          {{{ InputContainer
                                  className="modal__input-chats"
                                  id="modal__input-add"
                                  type="text"
                                  name="add"
                                  id="add"
                          }}}
                          {{{Button onClick=onAddUser title="Добавить пользователя" className="modal__btn-change"}}}
                      {{/if}}

                      {{#if dialogueDeleteMode}}
                          <h2 class="modal__title">ID пользователя</h2>
                          {{{ InputContainer
                                  className="modal__input-chats"
                                  id="modal__input-delete"
                                  type="text"
                                  name="delete"
                                  id="delete"
                          }}}
                          {{{Button onClick=onDeleteUser title="Удалить пользователя" className="modal__btn-change"}}}
                      {{/if}}

                      </form>
                  </div>
              </div>
          {{else}}
              <div></div>
          {{/if}}
    `;
  }
}
