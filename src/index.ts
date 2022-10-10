
import {renderDOM, registerComponent} from "./utils";

import LoginPage from "./pages/login";

import Button from "./components/button";
import Input from "./components/input";
import Chat from "./components/chat";
registerComponent(Button);
registerComponent(Input);
registerComponent(Chat);

document.addEventListener("DOMContentLoaded", () => {
  const App = new LoginPage();
 renderDOM(App);
});

