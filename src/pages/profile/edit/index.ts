import {Block} from "../../../core";
import {withUser} from "../profile";
import UserController from "../../../api/user/controller";
import AuthController from "../../../api/auth/controller";
import {returnFormData} from "../../../utils/functions";
import {validateForm} from "../../../utils/validation";
import {EditProfileData} from "../../../models";
import Router from "../../../router";

class ProfileEditPageBase extends Block {
  constructor(props: any) {
    super({...props});
    void AuthController.fetchUser();
    this.setProps({
      userData: props,
      onClickBack: () => {
        Router.back();
      },
      onEditAvatar: () => {
        this.refs.avatarModal.setProps({
          isOpen: true,
        });
      },
      onCloseEditAvatar: () => {
        this.refs.avatarModal.setProps({
          isOpen: false,
        });
      },
      onSaveData: async (e: Event) => {
        e.preventDefault();

        if (!validateForm(".profile-page__edit-form")) {
          return;
        }

        const formData = returnFormData("profile-page__edit-form");
        if (formData) {
          await UserController.editProfile(formData as unknown as EditProfileData);
          Router.go("/settings");
        }
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <main class="profile-page profile-page_edit">
            {{{Modal isOpen=isOpen ref="avatarModal" onClose=onCloseEditAvatar avatarMode=true}}}
            <div class="profile-page__container">
                {{{ Button
                        className="profile-page__back"
                        onClick=onClickBack
                }}}

                {{{Avatar src=userData.avatar isEdit=true onClick=onEditAvatar}}}
                <form class="profile-page__edit-form" id="profile-page__edit-form" autocomplete="off">
                    {{{ InputContainer
                            type="text"
                            name="email"
                            title="Почта"
                            id="email"
                            ref="email"
                            value=userData.email
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="login"
                            title="Логин"
                            id="login"
                            ref="login"
                            value=userData.login
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="first_name"
                            title="Имя"
                            id="first_name"
                            ref="first_name"
                            value=userData.first_name
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="second_name"
                            title="Фамилия"
                            id="second_name"
                            ref="second_name"
                            value=userData.second_name
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="display_name"
                            title="Имя в чате"
                            id="display_name"
                            ref="display_name"
                            value=userData.display_name
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="phone"
                            title="Телефон"
                            id="phone"
                            ref="phone"
                            value=userData.phone
                            onBlur=onBlur
                    }}}
                </form>
                {{{ Button
                        className="profile-page__save-data"
                        title="Сохранить"
                        onClick=onSaveData
                }}}
            </div>
        </main>
    `;
  }
}

const ProfileEditPage = withUser(ProfileEditPageBase);
export default ProfileEditPage;
