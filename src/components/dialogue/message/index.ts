import Block from "../../../core/Block";
import {Message} from "../../../models";

import "./dialogue-message.sass";
import store from "../../../store";

export default class DialogueMessage extends Block {
  static componentName = "DialogueMessage";

  constructor(props: Message) {
    super(props);
    this.setProps({
      isMyMessage: store.getState().user.id === this.props.userId
    })
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="message {{#if isMyMessage}} message_my{{/if}}">{{content}}</div>
    `;
  }
}
