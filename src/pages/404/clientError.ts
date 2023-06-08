import Block from "../../core/Block";
import {RouterPath} from "../../models/enums";

export class ClientErrorPage extends Block {
  constructor(props: unknown) {
    super(props);
    this.setProps({
      defaultLink: RouterPath.default,
    });
  }
  render() {
    // language=hbs
    return `
            <main class="main client-error">
                <h1 class="client-error__title">404</h1>
                <p class="client-error__subtitle">Не туда попали</p>
                {{{Link className="client-error__link" href=defaultLink text="Вернуться назад"}}}
            </main>
    `;
  }
}
