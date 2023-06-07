// import { expect } from "chai";
// import Router from "./";
// import Block from "../core/Block";
//
// class Component extends Block {
//   static get componentName() {
//     return "Component";
//   }
//   render() {
//     return "<div></div>";
//   }
// }
// describe.skip("Проверяем переходы у Роута", () => {
//   Router
//     .use("/", Component)
//     .use("/chats", Component)
//     .use("/profile", Component);
//   it("Проверка инициализации роутов", () => {
//     Router.start();
//     expect(Router.routes.length).to.eq(3);
//   });
//   it("Переход на /", () => {
//     Router.start();
//     Router.go("/");
//     expect(window.location.pathname).to.eq("/");
//   });
//   it("Переход на /chats", () => {
//     Router.start();
//     Router.go("/chats");
//     expect(window.location.pathname).to.eq("/chats");
//   });
//   it("Переход на /profile", () => {
//     Router.start();
//     Router.go("/profile");
//     expect(window.location.pathname).to.eq("/profile");
//   });
// });
