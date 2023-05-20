import {registerComponent} from "./core";
import Router from "./router";
import store from "./store";
import AuthController from "./api/auth/controller";
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

registerComponent(Button);
registerComponent(Chat);
registerComponent(Input);
registerComponent(InputError);
registerComponent(InputContainer);
registerComponent(Avatar);
registerComponent(Modal);
registerComponent(Dialogue);
registerComponent(DialogueMessage);

(window as any).store = store;

window.addEventListener("DOMContentLoaded", async () => {
  Router.use("/", loginPage)
    .use("/login", loginPage)
    .use("/signup", RegisterPage)
    .use("/settings", ProfilePage)
    .use("/settings/edit", ProfileEditPage)
    .use("/settings/edit-password", ProfileEditPasswordPage)
    .use("/chats", ChatsPage)
    .use("/not-found", ClientErrorPage)
    .use("/server-error", ServerErrorPage);

  try {
    const userInfo = await AuthController.fetchUser();
    Router.start();
    if (userInfo) {
      if (unProtectedRedirects.includes(window.location.pathname)) {
        Router.go("/chats");
      }
    } else {
      if (protectedRedirects.includes(window.location.pathname)) {
        Router.go("/");
      }
    }
  } catch (e) {
    Router.start();
  }
});
