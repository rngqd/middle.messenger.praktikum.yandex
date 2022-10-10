export {ClientErrorPage as default} from "./clientError";
import {renderDOM, registerComponent} from "../../utils";

import { ClientErrorPage } from "./clientError";

import Button from "../../components/button";
import Input from "../../components/input";
import Chat from "../../components/chat";
registerComponent(Button);
registerComponent(Input);
registerComponent(Chat);

document.addEventListener("DOMContentLoaded", () => {
    const App = new ClientErrorPage();
    renderDOM(App);
});
