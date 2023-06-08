import { expect } from "chai";
import {Block} from "../core";
import Router from "./index";
import {RouterPath} from "../models/enums";

class Component extends Block {
  static get componentName() {
    return "Component";
  }
  render() {
    return "<div></div>";
  }
}
describe("Роутер", () => {
  Router
    .use(RouterPath.default, Component)
    .use(RouterPath.chats, Component)
    .use(RouterPath.profile, Component);
  
  beforeEach(()=> {
    Router.start();
  })
  
  it("Происходит инициализация роутов", () => {
    expect(Router.routes.length).to.eq(3);
  });
  
  it("Переходит на /", () => {
    Router.go(RouterPath.default);
    expect(window.location.pathname).to.eq(RouterPath.default);
  });
  
  it("Переходит на /chats", () => {
    Router.go(RouterPath.chats);
    expect(window.location.pathname).to.eq(RouterPath.chats);
  });
  
  it("Переходит на /profile", () => {
    Router.go(RouterPath.profile);
    expect(window.location.pathname).to.eq(RouterPath.profile);
  });
});
