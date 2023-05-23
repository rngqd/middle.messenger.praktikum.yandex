import {Block} from "../../../core";
import {withUser} from "../profile";
import UserController from "../../../api/user/controller";
import AuthController from "../../../api/auth/controller";
import {returnFormData} from "../../../utils/functions";
import {validateForm} from "../../../utils/validation";
import {EditProfileData} from "../../../models";
import Router from "../../../router";
import {RouterPath} from "../../../models/enums";

class ProfileEditPageBase extends Block {
  constructor() {
    super();
    void AuthController.fetchUser();
    this.setProps({
      onClickBack: () => {
        Router.back();
      },
      onEditAvatar: () => {
        const modal = document.querySelector('.modal') as HTMLElement;
        modal.classList.add('modal_visible')
      },
      onBrowseFile: () => {
        document.getElementById("modal__input-file")?.click();
      },
      onChangeAvatar: async (e: Event) => {
        e.preventDefault();
        const avatar = document.getElementById("modal__input-file") as HTMLInputElement;
        const file = (avatar as any).files[0];
        const formData = new FormData();
        if (avatar && file) {
          formData.append("avatar", (avatar as any).files[0]);
          await UserController.editAvatar(formData);
        }
      },
      onSaveData: async (e: Event) => {
        e.preventDefault();

        if (!validateForm(".profile-page__edit-form")) {
          return;
        }

        const formData = returnFormData("profile-page__edit-form");
        if (formData) {
          await UserController.editProfile(formData as unknown as EditProfileData);
          Router.go(RouterPath.profile);
        }
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <main class="profile-page profile-page_edit">
            <div class="profile-page__container">
                {{{ Button
                        className="profile-page__back"
                        onClick=onClickBack
                }}}

                {{{Avatar src=avatar isEdit=true onClick=onEditAvatar}}}
                <form class="profile-page__edit-form" id="profile-page__edit-form" autocomplete="off">
                    {{{ InputContainer
                            type="text"
                            name="email"
                            title="Почта"
                            id="email"
                            ref="email"
                            value=email
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="login"
                            title="Логин"
                            id="login"
                            ref="login"
                            value=login
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="first_name"
                            title="Имя"
                            id="first_name"
                            ref="first_name"
                            value=first_name
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="second_name"
                            title="Фамилия"
                            id="second_name"
                            ref="second_name"
                            value=second_name
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="display_name"
                            title="Имя в чате"
                            id="display_name"
                            ref="display_name"
                            value=display_name
                            onBlur=onBlur
                    }}}
                    {{{ InputContainer
                            type="text"
                            name="phone"
                            title="Телефон"
                            id="phone"
                            ref="phone"
                            value=phone
                            onBlur=onBlur
                    }}}
                </form>
                {{{ Button
                        className="profile-page__save-data"
                        title="Сохранить"
                        onClick=onSaveData
                }}}
            </div>
            {{#Modal}}
                {{#Form id="modal__form" onSubmit=onChangeAvatar}}
                    <p class="modal__title">Загрузить файл</p>
                    {{{ InputContainer
                            className="modal__input-file"
                            id="modal__input-file"
                            type="file"
                            name="avatar"
                            id="avatar"
                    }}}
                    {{{ Button
                            title="Выберите файл на компьютере"
                            onClick=onBrowseFile
                            className="modal__input-file_helper"
                            type="button"
                    }}}
                    {{{ Button
                            className="modal__btn-change"
                            title="Изменить"
                            type="submit"

                    }}}
                {{/Form}}
            {{/Modal}}
        </main>
    `;
  }
}

const ProfileEditPage = withUser(ProfileEditPageBase);
export default ProfileEditPage;
