export {ChatsPage as default} from "./chats";

import {renderDOM, registerComponent} from "../../utils";

import { ChatsPage } from "./chats";

import Button from "../../components/button";
import Input from "../../components/input";
import Chat from "../../components/chat";
registerComponent(Button);
registerComponent(Input);
registerComponent(Chat);

document.addEventListener("DOMContentLoaded", () => {
    const App = new ChatsPage();
    renderDOM(App);
});
