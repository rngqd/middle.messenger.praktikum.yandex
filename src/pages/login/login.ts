import Block from "../../utils/Block";
import {validateInput} from "../../utils/validation";
import {IState} from "../../models";
import { makeDataObject } from "../../utils/functions";

export class LoginPage extends Block {
 protected getStateFromProps() {
  this.state = {
   initialValues: {
    login: "",
    password: "",
   },
   values: {
   
   },
   errors: {
    login: "",
    password: "",
   },
   
   onLogin: () => {
    const loginData = makeDataObject(this.state.values, this.refs);
    const nextState: IState = {
     errors: validateInput(loginData, {
      login: "",
      password: "",
     }),
     values: {...loginData},
    };
    
    this.setState(nextState);

    console.log("action/login", loginData);
   },
   onBlur: () => {
    const loginData = makeDataObject(this.state.values, this.refs);
    const nextState: IState =  {
     errors: validateInput(loginData, {
      login: "",
      password: "",
     }),
     values: {...loginData},
    };

    this.setState(nextState);
   },
  };
 }

 render() {
  const {errors, values} = this.state;

  // language=hbs
  return `
      <main class="main login-page">
        <form class="login-page__container">
          <p class="login-page__title">Войти</p>
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
              type="password"
              name="password"
              title="Пароль"
              id="password"
              ref="password"
              value="${values.password}"
              error="${errors.password}"
              onBlur=onBlur
          }}}
          {{{Button title="Войти" className="button" onClick=onLogin}}}
          <a href="/pages/register" class="login-page__link">Ещё не зарегистрированы?</a>
        </form>
      </main>
    `;
 }
}
