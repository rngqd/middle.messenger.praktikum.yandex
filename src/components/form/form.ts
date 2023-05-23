import Block from "../../core/Block";

import "./form.sass";

interface FormProps {
  className?: string;
  id?: string;
  onSubmit: () => void;
}

export class Form extends Block {
  static componentName = "Form";
  
  constructor({onSubmit, ...props}: FormProps) {
    super({...props, events: {submit: onSubmit}});
  }
  
  protected render(): string {
    // language=hbs
    return `
        <form id="{{id}}" class="form">
            <div class="{{className}}" data-layout="children"></div>
        </form>
    `;
  }
}
