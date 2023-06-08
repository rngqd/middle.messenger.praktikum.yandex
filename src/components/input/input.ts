import Block from "../../core/Block";

import "./input.sass";

interface InputProps {
  type: "text" | "password" | "email" | "file";
  className?: string;
  name: string;
  id: string;
  value?: string;
  isDisable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class Input extends Block {
  static componentName = "Input";
  constructor({onFocus, onBlur, ...props}: InputProps) {
    super({
      events: {focus: onFocus, blur: onBlur},
      ...props,
    });
  }

  protected render(): string {
    // language=hbs
    return `
           <input class="input-container__input {{className}}"
                  type="{{type}}"
                  id="{{id}}"
                  name="{{name}}"
                  value="{{value}}"
                  role="presentation"
                  {{#if isDisable}}disabled{{/if}}
                  placeholder={{placeholder}}
                 
           >
        `;
  }
}
