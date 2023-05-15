import Block from "../../utils/Block";
import { validateInput } from "../../utils/validation";
import { IState } from "../../models";
import { makeDataObject } from "../../utils/functions";

export class RegisterPage extends Block {
 protected getStateFromProps() {
  this.state = {
   values: {
    login: "",
    password: "",
    repeat_password: "",
    email: "",
    phone: "",
    first_name: "",
    second_name: "",
   },
   errors: {
    login: "",
    password: "",
    repeat_password: "",
    email: "",
    phone: "",
    first_name: "",
    second_name: "",
   },
   onRegister: () => {
    const registerData = makeDataObject(this.state.values, this.refs);

    const nextState: IState= {
     errors: validateInput(registerData, {
      login: "",
      password: "",
      repeat_password: "",
      email: "",
      phone: "",
      first_name: "",
      second_name: "",
     }),
     values: {...registerData},
    };

    this.setState(nextState);

    console.log("action/register", registerData);
   },

   setState: () => {},

   onBlur: () => {
    const registerData = makeDataObject(this.state.values, this.refs);
 
    const nextState: IState= {
     errors: validateInput(registerData, {
      login: "",
      password: "",
      repeat_password: "",
      email: "",
      phone: "",
      first_name: "",
      second_name: "",
     }),
     values: {...registerData},
    };
    
    this.setState(nextState);
   },
  };
 }

 render() {
  const {errors, values} = this.state;

  // language=hbs
  return `
            <main class="main register-page">
              <form class="register-page__container">
                  <p class="register-page__title">{{title}}</p>
                  {{{ Input
                          type="email"
                          name="email"
                          title="Почта"
                          id="email"
                          ref="email"
                          value="${values.email}"
                          error="${errors.email}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="text"
                          name="login"
                          title="Логин"
                          id="login"
                          ref="login"
                          value="${values.login}"
                          error="${errors.login}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="text"
                          name="first_name"
                          title="Имя"
                          id="first_name"
                          ref="first_name"
                          value="${values.first_name}"
                          error="${errors.first_name}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="text"
                          name="second_name"
                          title="Фамилия"
                          id="second_name"
                          ref="second_name"
                          value="${values.second_name}"
                          error="${errors.second_name}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="tel"
                          name="phone"
                          title="Телефон"
                          id="phone"
                          ref="phone"
                          value="${values.phone}"
                          error="${errors.phone}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="password"
                          name="password"
                          title="Пароль"
                          id="password"
                          ref="password"
                          value="${values.password}"
                          error="${errors.password}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="password"
                          name="repeat_password"
                          title="Пароль ещё раз"
                          id="repeat_password"
                          ref="repeat_password"
                          value="${values.repeat_password}"
                          error="${errors.repeat_password}"
                          onBlur=onBlur
                  }}}
                  {{{ Button title="Зарегистрироваться" className="button" onClick=onRegister}}}
                  <a href="/" class="register-page__link">Войти</a>
              </form>
          </main>
    `;
 }
}
