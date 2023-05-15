import Block from "../../utils/Block";

import "./input.sass";

interface InputProps {
 type: string;
 name: string;
 title: string;
 value?: string;
 error?: string;
 onChange?: () => void;
 onBlur?: () => void;
}

export class Input extends Block {
 static componentName = "Input";
 constructor({onBlur, onChange, ...props}: InputProps) {
  super({
  ...props,
   events: {
    input: onChange,
    focusout: onBlur,
   },
  });
 }

 protected render(): string {
  // language=hbs
  return `
            <span class="input-container">
                <label class="input-container__label" for="{{name}}">{{title}}</label>
                <input class="input-container__input"
                       type="{{type}}"
                       id="{{name}}"
                       name="{{name}}"
                       value="{{value}}"
                >
                <div class="input-container__error">{{#if error}}{{error}}{{/if}}</div>
            </span>

        `;
 }
}
