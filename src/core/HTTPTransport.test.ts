import { expect } from "chai";
import HTTPTransport from "./HTTPTransport";

import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';

describe('Отправка запросов', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];
  
  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    // @ts-expect-error
    global.XMLHttpRequest = xhr;
    
    xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    });
    instance = new HTTPTransport("/auth");
  });
  
  afterEach(() => {
    requests.length = 0;
  })
  
  
  it('Проверка отправки GET запроса', () => {
    instance.get("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("GET");
  })
  
  it('Проверка отправки POST запроса', () => {
    instance.post("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("POST");
  })
  
  it('Проверка отправки PUT запроса', () => {
    instance.put("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("PUT");
  })
  
  it('Проверка отправки DELETE запроса', () => {
    instance.delete("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("DELETE");
  })
})
