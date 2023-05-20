import {Block} from "../../../core";
import {withUser} from "../profile";
import UserController from "../../../api/user/controller";
import AuthController from "../../../api/auth/controller";
import { returnFormData } from "../../../utils/functions";
import { validateRepeatPassword } from "../../../utils/validation";
import Router from "../../../router";


class ProfileEditPasswordPageBase extends Block {
  constructor(props: any) {
    super({...props});
    void AuthController.fetchUser();
    const setErrorMessage = (message: string) => {
      this.setProps({
        message: message
      })
    }
    this.setProps({
      userData:props,
      onClickBack: () => {
        Router.back()
      },
   
      onChangePassword: async (e: Event) => {
        e.preventDefault();
  
        const formData = returnFormData('profile-page__edit-pass-form') as Record<string, string>
        const validInfo = validateRepeatPassword( formData.newPassword, formData.repeatNewPassword )
        if(formData) {
          if(validInfo !== true) {
            setErrorMessage(validInfo)
          } else {
            await UserController.editPassword({
              oldPassword: formData.oldPassword,
              newPassword: formData.newPassword
            })
            Router.go('/settings')
          }
        }
      }
    });
  }
  
  protected render(): string {
    // language=hbs
    return `
        <main class="profile-page profile-page_edit-pass">
            {{{Modal isOpen=isOpen ref="avatarModal" onClose=onCloseEditAvatar }}}
            <div class="profile-page__container">
                {{{ Button
                        className="profile-page__back"
                        onClick=onClickBack
                }}}

                {{{Avatar src=userData.avatar isEdit=false}}}
                <form class="profile-page__edit-pass-form" id="profile-page__edit-pass-form" autocomplete="off">
                    {{{ InputContainer
                            type="password"
                            name="oldPassword"
                            title="Старый пароль"
                            id="password"
                            ref="password"
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="password"
                            name="newPassword"
                            title="Новый пароль"
                            id="newPassword"
                            ref="newPassword"
                            
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="password"
                            name="repeatNewPassword"
                            title="Новый пароль ещё раз"
                            id="repeatNewPassword"
                            ref="repeatNewPassword"
                            onBlur=onBlur
                    }}}
                </form>
                <p class="edit-pass__error">{{message}}</p>
                {{{ Button
                        className="profile-page__save-data"
                        title="Сохранить"
                        onClick=onChangePassword
                }}}
            </div>
        </main>
    `;
  }
}

const ProfileEditPasswordPage = withUser(ProfileEditPasswordPageBase);
export default ProfileEditPasswordPage
