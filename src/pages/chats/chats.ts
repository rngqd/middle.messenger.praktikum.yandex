import Block from "../../utils/Block";

import avatar from "../../../static/img/avatar.jpeg";

export class ChatsPage extends Block {
    render() {
        // language=hbs
        const {} = this.state;
        return `
            <main class="main chats-page">
                <div class="chats-page__container chats-page__container_left">
                    <a class="chats-page__profile" href="pages/profile">Профиль</a>
                    <input class="chats-page__search" type="text" placeholder="Поиск">
                    <div class="chats-page__chats">
                        {{{ Chat
                                avatar="${ avatar }"
                                name="User"
                                message="message"
                                time="22:00"
                                count="2"
                        }}}
                    </div>
                </div>
                <div class="chats-page__container chats-page__container_right">
                    <div class="chats-page__chat">
                        <div class="chats-page__header">
                            <div class="chats-page__header-container">
                                <img class="chats-page__header-avatar"
                                     src="${ avatar }"
                                     alt="chat-avatar">
                                <span class="chats-page__header-name">Имя пользователя</p>
                            </div>
                            <button class="chats-page__header-function"
                            ">
                        </div>
                        <div class="chats-page__content">

                        </div>
                        <div class="chats-page__footer">
                            <button class="chats-page__footer-clip"></button>
                            <input class="chats-page__footer-input" type="text" placeholder="Сообщение">
                            <button class="chats-page__footer-send"></button>
                        </div>
                    </div>
                </div>
            </main>
        `;
    }
}
