import Block from "../../utils/Block";
import {validateInput} from "../../utils/validation";
import {IInputData} from "../../models";

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
    const registerData = {
     login: (this.refs.login.querySelector("input") as HTMLInputElement).value,
     password: (this.refs.password.querySelector("input") as HTMLInputElement).value,
     repeat_password: (this.refs.repeat_password.querySelector("input") as HTMLInputElement).value,
     email: (this.refs.email.querySelector("input") as HTMLInputElement).value,
     phone: (this.refs.phone.querySelector("input") as HTMLInputElement).value,
     first_name: (this.refs.first_name.querySelector("input") as HTMLInputElement).value,
     second_name: (this.refs.second_name.querySelector("input") as HTMLInputElement).value,
    };

    const nextState: {errors: IInputData; values: IInputData} = {
     errors: {
      login: "",
      password: "",
      repeat_password: "",
      email: "",
      phone: "",
      first_name: "",
      second_name: "",
     },
     values: {...registerData},
    };

    nextState.errors = validateInput(registerData, nextState.errors);

    this.setState(nextState);

    console.log("action/register", registerData);
   },

   setState: () => {},

   onBlur: () => {
    const registerData = {
     login: (this.refs.login.querySelector("input") as HTMLInputElement).value,
     password: (this.refs.password.querySelector("input") as HTMLInputElement).value,
     repeat_password: (this.refs.repeat_password.querySelector("input") as HTMLInputElement).value,
     email: (this.refs.email.querySelector("input") as HTMLInputElement).value,
     phone: (this.refs.phone.querySelector("input") as HTMLInputElement).value,
     first_name: (this.refs.first_name.querySelector("input") as HTMLInputElement).value,
     second_name: (this.refs.second_name.querySelector("input") as HTMLInputElement).value,
    };
    const nextState: {errors: IInputData; values: IInputData} = {
     errors: {
      email: "",
      login: "",
      password: "",
      repeat_password: "",
      first_name: "",
      second_name: "",
      phone: "",
     },
     values: {...registerData},
    };

    nextState.errors = validateInput(registerData, nextState.errors);

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
