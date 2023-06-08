import {registerComponent} from "./core";
import Router from "./router";
import store from "./store";
import AuthController from "./api/auth/controller";
import {RouterPath} from "./models/enums";
import "./styles/index.sass";
import {unProtectedRedirects, protectedRedirects} from "./utils/constants";
import loginPage from "./pages/login";
import ChatsPage from "./pages/chats";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import ProfileEditPage from "./pages/profile/edit";
import ProfileEditPasswordPage from "./pages/profile/edit-password";
import ClientErrorPage from "./pages/404";
import ServerErrorPage from "./pages/500";

import Button from "./components/button";
import Chat from "./components/chat";
import {Input, InputError, InputContainer} from "./components/input";
import Avatar from "./components/avatar";
import Modal from "./components/modal";
import Dialogue from "./components/dialogue";
import DialogueMessage from "./components/dialogue/message";
import Form from "./components/form";
import Link from "./components/link";

registerComponent(Button);
registerComponent(Chat);
registerComponent(Input);
registerComponent(InputError);
registerComponent(InputContainer);
registerComponent(Avatar);
registerComponent(Modal);
registerComponent(Dialogue);
registerComponent(DialogueMessage);
registerComponent(Form);
registerComponent(Link);

(window as any).store = store;

window.addEventListener("DOMContentLoaded", async () => {
  Router.use(RouterPath.default, loginPage)
    .use(RouterPath.login, loginPage)
    .use(RouterPath.register, RegisterPage)
    .use(RouterPath.profile, ProfilePage)
    .use(RouterPath.editProfile, ProfileEditPage)
    .use(RouterPath.editProfilePassword, ProfileEditPasswordPage)
    .use(RouterPath.chats, ChatsPage)
    .use(RouterPath.clientError, ClientErrorPage)
    .use(RouterPath.serverError, ServerErrorPage);

  try {
    const userInfo = await AuthController.fetchUser();
    Router.start();
    if (userInfo) {
      if (unProtectedRedirects.includes(window.location.pathname)) {
        Router.go(RouterPath.chats);
      }
    } else {
      if (protectedRedirects.includes(window.location.pathname)) {
        Router.go(RouterPath.default);
      }
    }
  } catch (e) {
    Router.start();
  }
});
