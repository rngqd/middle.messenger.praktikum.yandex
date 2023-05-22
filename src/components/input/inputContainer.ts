import Block from "../../core/Block";
import "./input.sass";
import {validateInput} from "../../utils/validation";

interface InputContainerProps {
  className?: string;
  type?: string;
  name?: "login" | "password";
  id?: string;
  label?: string;
  toCompare?: string;
  isDisable?: boolean;
  placeholder?: string;
}

export class InputContainer extends Block {
  static componentName = "InputContainer";
  constructor(props: InputContainerProps) {
    const onBlur = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const inputError = validateInput({[target.name]: target.value});

      this.refs.errorRef.setProps({
        error: inputError ? inputError : "",
      });
    };

    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        onBlur(e);
      },
      onFocus: (e: FocusEvent) => {
        onBlur(e);
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <span class="input-container  {{className}}">
            <label class="input-container__label" for="{{name}}">{{title}}</label>
            {{{ Input
                      type=type
                      ref="inputRef"
                      name=name
                      value=value
                      id=id
                      onFocus=onFocus
                      onBlur=onBlur
                      isDisable=isDisable
                      placeholder=placeholder
            }}}
          {{{ InputError ref="errorRef" error=error }}}
        </span>
    `;
  }
}
