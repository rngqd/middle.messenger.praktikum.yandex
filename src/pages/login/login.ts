import Block from "../../core/Block";
import AuthController from "../../api/auth/controller";
import {returnFormData} from "../../utils/functions";
import {validateForm} from "../../utils/validation";
import {LoginData} from "../../models";
import {RouterPath} from "../../models/enums";

export class LoginPage extends Block {
  constructor(props: any) {
    super({...props});
    this.setProps({
      onLogin: (e: Event) => {
        e.preventDefault();
        if (!validateForm(".login-page__form")) {
          return;
        }

        const formData = returnFormData("login-page__form");
        if (formData) {
          void AuthController.signin(formData as unknown as LoginData);
        }
      },
      registerLink: RouterPath.register,
    });
  }

  protected render() {
    // language=hbs
    return `
        <main class="main login-page">
            {{#Form className="login-page__form" id="login-page__form" onSubmit=onLogin}}
                <p class="login-page__title">Войти</p>
                {{{ InputContainer
                        type="text"
                        name="login"
                        title="Логин"
                        id="login"
                        ref="login"
                        onBlur=onBlur
                        onInput=onInput
                }}}
                {{{ InputContainer
                        type="password"
                        name="password"
                        title="Пароль"
                        id="password"
                        ref="password"
                        error=error
                        onBlur=onBlur
                        onInput=onInput
                }}}
                {{{Button title="Войти" className="login-page__button" type="submit"}}}
                {{{Link className="login-page__link" href=registerLink text="Ещё не зарегистрированы?"}}}
            {{/Form}}
        </main>
    `;
  }
}
