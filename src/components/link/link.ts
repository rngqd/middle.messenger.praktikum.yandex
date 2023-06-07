import Block from "../../core/Block";
import Router from "../../router";
interface LinkProps {
  text: string;
  className: string;
  onClick: () => void;
}

export class Link extends Block {
  static componentName = "Link";
  
  constructor({onClick, ...props}: LinkProps) {
    super({
      ...props, events:
        {
          click: (e: Event) => {
            e.preventDefault();
            this.navigate();
          },
        },
    });
  }
  
  navigate() {
    Router.go(this.props.href);
  }
  
  protected render(): string {
    // language=hbs
    return `
        <a class="{{className}}" href="{{href}}">
            {{text}}
        </a>
    `;
  }
}
