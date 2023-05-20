import Block from "../../core/Block";
import { withStore } from "../../store";
import ChatController from "../../api/chats/controller";
import { ChatData } from "../../models";

export class ChatsPageBase extends Block {
    constructor(props: any) {
        super(props);
        void ChatController.fetchChats();
        const activeChat = (this.props.chats || []).find(
          (chat: ChatData) => chat.id === this.props.activeChat
        );
    
        const title = activeChat?.title;
    
        this.setProps({
            onOpenModal: () => {
                this.refs.chatModal.setProps({
                    isOpen: true
                })
            },
            onCloseModal: ()=> {
                this.refs.chatModal.setProps({
                    isOpen: false
                })
            },
            activeChatTitle: title
        })
    }
    
    render() {
        // language=hbs
        return `
            <main class="main chats-page">
                <div class="chats-page__container chats-page__container_left">
                    <a class="chats-page__profile" href="/settings">Профиль</a>
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
                    {{{Dialogue title=activeChatTitle activeChatId=activeChat messages=messages}}}
                {{else}}
                    <div class="chats-page__select">
                        <h2 class="chats-page__title">Выберите чат</h2>
                    </div>
                {{/if}}
                </div>
                {{{Modal isOpen=isOpen ref="chatModal" onClose=onCloseModal chatMode=true}}}
            </main>
        `;
    }
}

const withChats = withStore((state) => {
    return {
        chats: [...(state.chats || [])],
        messages: [ ...(state.messages || [])],
        activeChat: state.activeChat
    };
});

export const ChatsPage = withChats(ChatsPageBase);
