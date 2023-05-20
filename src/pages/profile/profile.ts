import Block from "../../core/Block";
import AuthController from "../../api/auth/controller";
import {withStore} from "../../store";
import Router from "../../router";

class ProfilePage extends Block {
  constructor(props: any) {
    super({...props});
    void AuthController.fetchUser();
    this.setProps({
      onLogout: () => {
        void AuthController.logout();
      },
      onChangePassword: () => {
        Router.go("/settings/edit-password");
      },
      onChangeData: () => {
        Router.go("/settings/edit");
      },
      onClickBack: () => {
        Router.back();
      },
      userData: props,
    });
  }

  protected render() {
    // language=hbs
    return `
      <main class="profile-page">
          <div class="profile-page__container">
           {{{ Button
                     className="profile-page__back"
                     onClick=onClickBack
           }}}
            
            
            {{{Avatar src=userData.avatar isEdit=false}}}
              <form class="profile-page__form" autocomplete="off">
                  {{{ InputContainer
                           type="text"
                           name="email"
                           title="Почта"
                           id="email"
                           ref="email"
                           value=userData.email
                           onBlur=onBlur
                           isDisable=true
                  }}}
                  {{{ InputContainer
                           type="text"
                           name="login"
                           title="Логин"
                           id="login"
                           ref="login"
                           value=userData.login
                           onBlur=onBlur
                           isDisable=true
                  }}}
                  {{{ InputContainer
                           type="text"
                           name="first_name"
                           title="Имя"
                           id="first_name"
                           ref="first_name"
                           value=userData.first_name
                           onBlur=onBlur
                           isDisable=true
                  }}}
                  {{{ InputContainer
                           type="text"
                           name="second_name"
                           title="Фамилия"
                           id="second_name"
                           ref="second_name"
                           value=userData.second_name
                           onBlur=onBlur
                           isDisable=true
                  }}}
                  {{{ InputContainer
                           type="text"
                           name="display_name"
                           title="Имя в чате"
                           id="display_name"
                           ref="display_name"
                           value=userData.display_name
                           onBlur=onBlur
                           isDisable=true
                  }}}
                  {{{ InputContainer
                           type="text"
                           name="phone"
                           title="Телефон"
                           id="phone"
                           ref="phone"
                           value=userData.phone
                           onBlur=onBlur
                           isDisable=true
                  }}}
              </form>
              {{{ Button
                        className="profile-page__btn profile-page__change-date"
                        title="Изменить данные"
                        onClick=onChangeData
              }}}
              {{{ Button
                        className="profile-page__btn profile-page__change-password"
                        title="Изменить пароль"
                        onClick=onChangePassword
              }}}
              {{{ Button
                        className="profile-page__btn profile-page__exit"
                        title="Выйти"
                        onClick=onLogout
              }}}
          </div>
      </main>
    `;
  }
}

export const withUser = withStore(state => ({...state.user}));

export const ProfilePageWithStore = withUser(ProfilePage);
