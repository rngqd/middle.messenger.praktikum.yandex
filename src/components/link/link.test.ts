import {Link} from "./link";
import {expect} from "chai";
import sinon from "sinon";
import Router from "../../router";

describe("Компонент ссылки", () => {
  it("проходит рендер", () => {
    new Link({href: "/"});
  });

  it("создает элемент ссылки", () => {
    const link = new Link({href: "/"});
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it("переход по событию click", () => {
    const link = new Link({href: "/"});
    const spy = sinon.spy(Router, "go");
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
