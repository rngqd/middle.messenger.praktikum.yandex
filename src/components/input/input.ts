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
 constructor({type, name, title, value, error, onChange, onBlur}: InputProps) {
  super({
   type,
   name,
   title,
   value,
   error,
   events: {
    input: onChange,
    focusout: onBlur,
   },
  });
 }

 protected render(): string {
  // language=hbs
  return `
<!--            <div class="input">-->
<!--                <input class="input__input" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}">-->
<!--                <div class="input__error">{{#if error}}{{error}}{{/if}}</div>-->
<!--            </div>-->
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
