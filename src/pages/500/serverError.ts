import Block from "../../utils/Block";

export class ServerErrorPage extends Block {
 render() {
  return `
            <main class="main server-error">
                <h1 class="server-error__title">500</h1>
                <p class="server-error__subtitle">Мы уже фиксим</p>
                <a href="/" class="server-error__link">Вернуться назад</a>
            </main>
    `;
 }
}
