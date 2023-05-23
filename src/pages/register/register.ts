import Block from "../../core/Block";
import AuthController from "../../api/auth/controller";
import {returnFormData} from "../../utils/functions";
import {validateForm} from "../../utils/validation";
import {SignupData} from "../../models";
import {RouterPath} from "../../models/enums";

export class RegisterPage extends Block {
  constructor() {
    super();
    this.setProps({
      onRegister: (e: Event) => {
        console.log('register')
        e.preventDefault();
        if (!validateForm(".register-page__form")) {
          return;
        }

        const formData = returnFormData("register-page__form");
        if (formData) {
          void AuthController.signup(formData as unknown as SignupData);
        }
      },
      loginLink: RouterPath.login
    });
  }

  protected render() {
    // language=hbs
    return `
         <main class="main register-page">
             {{#Form className="register-page__form" id="register-page__form" onSubmit=onRegister}}
                 <p class="register-page__title">Зарегистрироваться</p>
                 {{{ InputContainer
                         type="email"
                         name="email"
                         title="Почта"
                         id="email"
                         ref="email"
                         onBlur=onBlur
                 }}}
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
                         type="text"
                         name="first_name"
                         title="Имя"
                         id="first_name"
                         ref="first_name"
                         onBlur=onBlur
                 }}}
                 {{{ InputContainer
                         type="text"
                         name="second_name"
                         title="Фамилия"
                         id="second_name"
                         ref="second_name"
                         onBlur=onBlur
                 }}}
                 {{{ InputContainer
                         type="tel"
                         name="phone"
                         title="Телефон"
                         id="phone"
                         ref="phone"
                         onBlur=onBlur
                 }}}
                 {{{ InputContainer
                         type="password"
                         name="new-password"
                         title="Пароль"
                         id="password"
                         ref="password"
                         onBlur=onBlur
                 }}}
                 {{{ InputContainer
                         type="password"
                         name="password"
                         title="Пароль ещё раз"
                         id="newPassword"
                         ref="newPassword"
                         onBlur=onBlur
                 }}}
                 {{{ Button title="Зарегистрироваться" className="register-page__button" type="submit"}}}
                 <a href="{{loginLink}}" class="register-page__link">Войти</a>
             {{/Form}}
       </main>
    `;
  }
}
