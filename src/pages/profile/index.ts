export {ProfilePage as default} from "./profile";

import {renderDOM, registerComponent} from "../../utils";

import { ProfilePage } from "./profile";

import Button from "../../components/button";
import Input from "../../components/input";
import Chat from "../../components/chat";
registerComponent(Button);
registerComponent(Input);
registerComponent(Chat);

document.addEventListener("DOMContentLoaded", () => {
    const App = new ProfilePage();
    renderDOM(App);
});
