import {expect} from "chai";
import {queryStringify, set, formatDate} from "./functions";

describe("Функции утилиты", () => {
  describe("queryStringify", () => {
    it("Должна вылезти ошибка, если передан не объект", () => {
      const notObject = "1";

      const testThrowErrorFn = () => queryStringify(notObject);

      expect(testThrowErrorFn).throw(Error);
    });

    it("Должна вернуться строка с одним параметром", () => {
      const obj = {a: 1};

      const result = queryStringify(obj);

      expect(result).to.eq("?a=1");
    });

    it("Должна вернуться строка с несколькими параметрами", () => {
      const obj = {a: 1, b: 2};

      const result = queryStringify(obj);

      expect(result).to.eq("?a=1&b=2");
    });
  });

  describe("set", () => {
    let obj: object, path: string, value: unknown;

    beforeEach(() => {
      obj = {};
      path = "a.b.c";
      value = 3;
    });

    it("Должен вернуться переданный параметр если он не является объектом", () => {
      obj = 3 as any;

      const result = set(obj, path, value);

      expect(result).to.eq(obj);
    });

    it("Должен вернуться null, если он передан первым аргументом", () => {
      obj = null as any;

      const result = set(obj, path, value);

      expect(result).to.eq(obj);
    });

    it("Должна выскочить ошибка, если в качестве пути передана не строка", () => {
      path = 3 as any;

      const testThrowErrorFn = () => set(obj, path, value);

      expect(testThrowErrorFn).throw(Error);
    });

    it("Должно быть назначено новое свойство для переданного объекта с переданным значением", () => {
      const result = set(obj, path, value);

      expect((result as any).a.b.c).to.eq(value);
    });

    it("Должен вернуться новый объект", () => {
      const result = set(obj, path, value);
      expect(result).to.eq(obj);
    });
  });

  describe("formatDate", () => {
    it("Должно вернуться время с нулём, если минута или час меньше 9", () => {
      const date = new Date(2011, 0, 1);

      const result = formatDate(date);

      expect(result).to.eq("00:00");
    });

    it("Должно вернуться время без нуля, если минута или час больше 9", () => {
      const date = new Date(2011, 0, 1, 10, 10);

      const result = formatDate(date);

      expect(result).to.eq("10:10");
    });
  });
});
