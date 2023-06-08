import Block from "../../core/Block";
import {RouterPath} from "../../models/enums";

export class ServerErrorPage extends Block {
  constructor(props: unknown) {
    super(props);
    this.setProps({
      defaultLink: RouterPath.default,
    });
  }
  protected render() {
    // language=hbs
    return `
            <main class="main server-error">
                <h1 class="server-error__title">500</h1>
                <p class="server-error__subtitle">Мы уже фиксим</p>
                {{{Link className="client-error__link" href=defaultLink text="Вернуться назад"}}}
            </main>
    `;
  }
}
