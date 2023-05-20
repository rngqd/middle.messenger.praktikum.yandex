import Block from "../../core/Block";

import "./input.sass";

interface InputErrorProps {
  error?: string;
}

export class InputError extends Block {
  static componentName = "InputError";

  constructor(props: InputErrorProps) {
    super(props);
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="input-container__error">{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
