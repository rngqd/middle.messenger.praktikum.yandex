import Block from "../../core/Block";
import AuthController from "../../api/auth/controller"
import { returnFormData } from "../../utils/functions";
import { validateForm } from "../../utils/validation";
import { LoginData } from "../../models";

export class LoginPage extends Block {
   constructor(props: any) {
    
    super({...props});
     this.setProps({
      onLogin:(e: Event) => {
        e.preventDefault()
        if(!validateForm('.login-page__form')) {
          return
        }
        
        const formData = returnFormData('login-page__form')
        if(formData) {
          void AuthController.signin(formData as unknown as LoginData)
        }
      },
    })
   }
  
  protected render() {
  // language=hbs
  return `
        <main class="main login-page">
          <form class="login-page__form" id="login-page__form">
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
            {{{Button title="Войти" className="login-page__button" onClick=onLogin}}}
            <a href="/signup" class="login-page__link">Ещё не зарегистрированы?</a>
          </form>
        </main>
    `;
 }
}
