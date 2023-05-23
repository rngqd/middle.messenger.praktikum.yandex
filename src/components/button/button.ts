import Block from "../../core/Block";

import "./button.sass";

interface ButtonProps {
  title: string;
  className: string;
  type: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = "Button";

  constructor({onClick, ...props}: ButtonProps) {
    super({...props, events: {click: onClick}});
  }

  protected render(): string {
    // language=hbs
    return `
      <button class="button {{className}}" type="{{type}}"">
        {{title}}
      </button>
    `;
  }
}
