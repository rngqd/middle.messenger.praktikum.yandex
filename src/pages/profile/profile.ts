import Block from "../../utils/Block";
import {validateInput} from "../../utils/validation";
import avatarImg from "../../../static/img/avatar.jpeg";
import backArrowIcon from "../../../static/icon/arrow_back.svg";
import { IState } from "../../models";
import { makeDataObject } from "../../utils/functions";

export class ProfilePage extends Block {
 protected getStateFromProps() {
  this.state = {
   values: {
    email: "",
    login: "",
    first_name: "",
    second_name: "",
    display_name: "",
    phone: "",
   },
   errors: {
    email: "",
    login: "",
    first_name: "",
    second_name: "",
    display_name: "",
    phone: "",
   },
   onBlur: () => {
    const profileData = makeDataObject(this.state.values, this.refs);

    const nextState: IState = {
     errors: validateInput(profileData,{
      email: "",
      login: "",
      first_name: "",
      second_name: "",
      display_name: "",
      phone: "",
     }),
     values: {...profileData},
    };

    this.setState(nextState);
   },
   onChangeData: () => {
    const profileData = makeDataObject(this.state.values, this.refs);

    console.log("action/change profile data", profileData);
   },
   onExit: () => {
    console.log("Выйти из аккаунта");
   },
   onChangePassword: () => {
    console.log(`Смена пароля`);
   },
  };
 }

 render() {
  const {errors, values} = this.state;

  // language=hbs
  return `
      <main class="profile-page">
          <div class="profile-page__container">
              <a href="/" class="profile-page__back"><img src="${backArrowIcon}" alt='arrow-back'"></a>
              <img class="profile-page__avatar" src="${avatarImg}" alt="avatar">
              <form class="profile-page__form">
                  {{{ Input
                          type="text"
                          name="email"
                          title="Почта"
                          id="email"
                          ref="email"
                          value="${values.email}"
                          error ="${errors.email}"
                          onBlur=onBlur
                          
                  }}}
                  {{{ Input
                          type="text"
                          name="login"
                          title="Логин"
                          id="login"
                          ref="login"
                          value="${values.login}"
                          error ="${errors.login}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="text"
                          name="first_name"
                          title="Имя"
                          id="first_name"
                          ref="first_name"
                          value="${values.first_name}"
                          error ="${errors.first_name}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="text"
                          name="second_name"
                          title="Фамилия"
                          id="second_name"
                          ref="second_name"
                          value="${values.second_name}"
                          error ="${errors.second_name}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="text"
                          name="display_name"
                          title="Имя в чате"
                          id="display_name"
                          ref="display_name"
                          value="${values.display_name}"
                          error ="${errors.display_name}"
                          onBlur=onBlur
                  }}}
                  {{{ Input
                          type="text"
                          name="phone"
                          title="Телефон"
                          id="phone"
                          ref="phone"
                          value="${values.phone}"
                          error ="${errors.phone}"
                          onBlur=onBlur
                  }}}
              </form>
              {{{ Button
                      className="profile-page__btn profile-page__change-date"
                      title="Изменить данные"
                      onClick=onChangeData}}}
              {{{ Button
                      className="profile-page__btn profile-page__change-password"
                      title="Изменить пароль"
                      onClick=onChangePassword}}}
              {{{ Button
                      className="profile-page__btn profile-page__exit"
                      title="Выйти"
                      onClick=onExit}}}
          </div>
      </main>
    `;
 }
}
