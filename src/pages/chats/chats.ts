import Block from "../../core/Block";
import {withStore} from "../../store";
import ChatController from "../../api/chats/controller";
import {RouterPath} from "../../models/enums";
import {returnFormData} from "../../utils/functions";
export class ChatsPageBase extends Block {
  constructor(props: any) {
    super(props);
    void ChatController.fetchChats();
    this.setProps({
      onOpenModal: () => {
        const modal = document.querySelector(".modal_add-chat") as HTMLElement;
        modal.classList.add("modal_visible");
      },
      onCreateChat: (e: Event) => {
        e.preventDefault();
        const data = returnFormData("modal__form");
        console.log(data);
        if (data?.chats) {
          void ChatController.createChat(data.chats as string);
        }
      },
      profileLink: RouterPath.profile,
    });
  }

  render() {
    // language=hbs
    return `
            <main class="main chats-page">
                <div class="chats-page__container chats-page__container_left">
                    {{{Link className="chats-page__profile" href=profileLink text="Профиль" }}}
                    {{{ InputContainer
                                      type="search"
                                      name="search"
                                      id="search"
                                      placeholder="Поиск"
                    }}}
                    <div class="chats-page__chats">
                        {{#each chats}}
                            {{{ Chat
                              avatar=avatar
                              name=title
                              message=last_message.content
                              time=last_message.time
                              count=unread_count
                              id=id
                            }}}
                        {{/each}}
                    </div>
                    {{{Button title="Создать чат" className="chats-page__create" onClick=onOpenModal}}}
                </div>
                <div class="chats-page__container chats-page__container_right">
                
                {{#if activeChat}}
                    {{{Dialogue title=activeChat.title activeChatId=activeChat.id messages=messages}}}
                {{else}}
                    <div class="chats-page__select">
                        <h2 class="chats-page__title">Выберите чат</h2>
                    </div>
                {{/if}}
                </div>
                {{#Modal className="modal_add-chat"}}
                    {{#Form id="modal__form" onSubmit=onCreateChat}}
                        <h2 class="modal__title">Создать чат</h2>
                        {{{ InputContainer
                                className="modal__input-chats"
                                id="modal__input-text"
                                type="text"
                                name="chats"
                                id="chats"
                        }}}
                        {{{Button
                                className="modal__btn-change"
                                title="Создать"
                                type="submit"
                        }}}
                    {{/Form}}
                {{/Modal}}
            </main>
        `;
  }
}

const withChats = withStore(state => {
  return {
    chats: [...(state.chats || [])],
    messages: [...(state.messages || [])],
    activeChat: state.activeChat,
  };
});

export const ChatsPage = withChats(ChatsPageBase);
