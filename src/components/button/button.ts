import Block from "../../utils/Block";

import "./button.sass";

interface ButtonProps {
 title: string;
 className: string;
 onClick: () => void;
}

export class Button extends Block {
 static componentName = "Button";
 
 constructor({title, className, onClick}: ButtonProps) {
  super({title, className, events: {click: onClick}});
 }

 protected render(): string {
  // language=hbs
  return `
      <button class="{{className}}" type="button">
        {{title}}
      </button>
    `;
 }
}
