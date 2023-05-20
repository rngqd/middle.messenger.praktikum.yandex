export {RegisterPage as default} from "./register";

import {renderDOM, registerComponent} from "../../utils";

import { RegisterPage } from "./register";

import Button from "../../components/button";
import Input from "../../components/input";
import Chat from "../../components/chat";
registerComponent(Button);
registerComponent(Input);
registerComponent(Chat);

document.addEventListener("DOMContentLoaded", () => {
    const App = new RegisterPage();
    renderDOM(App);
});

