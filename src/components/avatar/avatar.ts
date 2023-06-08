import Block from "../../core/Block";
import "./avatar.sass";
import avatarImg from "../../../static/img/avatar.jpeg";
import {RESOURCE_URL} from "../../utils/constants";
import "./avatar.sass";

interface AvatarProps {
  src: string;
  isEdit: boolean;
  onClick?: () => void;
}

export class Avatar extends Block {
  static componentName = "Avatar";
  constructor({onClick, ...props}: AvatarProps) {
    super({...props, events: {click: onClick}});
  }

  protected render(): string {
    // language=hbs
    return `
        <div class="avatar-container">
          <img class="avatar"
               {{#if src}}
                  src="${RESOURCE_URL}{{src}}"
                  {{else}}
                     src=${avatarImg}
               {{/if}}
               alt="avatar">
          {{#if isEdit}}
              {{{Button className="avatar-overlay" onClick=onClick}}}
          {{/if}}
        </div>
    `;
  }
}
