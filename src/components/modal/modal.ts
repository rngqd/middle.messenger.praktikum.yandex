import Block from "../../core/Block";
import "./modal.sass";

interface ModalProps {
  className?: string;
}

export class Modal extends Block {
  static componentName = "Modal";
  
  constructor(props: ModalProps) {
    super(props);
    this.setProps({
      onCloseModal:()=> {
        const modalSelector = `.${props.className}` || ".modal"
        const modal = document.querySelector(modalSelector) as HTMLElement
        modal.classList.remove('modal_visible')
      }
    });
  }
  
  protected render(): string {
    // language=hbs
    return `
        <div class="modal {{#if isOpen}} modal_visible{{/if}} {{className}}">
            <div class="modal__container">
                {{{ Button className="modal__close" type="button" onClick=onCloseModal}}}
                <div data-layout="children"></div>
            </div>
        </div>
    `;
  }
}
