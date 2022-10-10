import Block from "../../utils/Block";

export class ClientErrorPage extends Block {
 render() {
  return `
            <main class="main client-error">
                <h2 class="client-error__title">404</h2>
                <p class="client-error__subtitle">Не туда попали</p>
                <a href="/" class="client-error__link">Вернуться назад</a>
            </main>
    `;
 }
}
