export {ServerErrorPage as default} from "./serverError";

import {renderDOM, registerComponent} from "../../utils";

import { ServerErrorPage } from "./serverError";

import Button from "../../components/button";
import Input from "../../components/input";
import Chat from "../../components/chat";
registerComponent(Button);
registerComponent(Input);
registerComponent(Chat);

document.addEventListener("DOMContentLoaded", () => {
    const App = new ServerErrorPage();
    renderDOM(App);
});
