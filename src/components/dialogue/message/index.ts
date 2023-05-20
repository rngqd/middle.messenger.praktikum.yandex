import Block from "../../../core/Block";
import {Message} from "../../../models";

import "./dialogue-message.sass";

export default class DialogueMessage extends Block {
  static componentName = "DialogueMessage";

  constructor(props: Message) {
    super({...props});
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="message messages__text--right">{{content}}</div>
    `;
  }
}
