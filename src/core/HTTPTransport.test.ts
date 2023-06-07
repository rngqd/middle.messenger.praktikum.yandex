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
  
  
  it('Отправляется GET запрос', () => {
    instance.get("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("GET");
  })
  
  it('Отправляется POST запрос', () => {
    instance.post("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("POST");
  })
  
  it('Отправляется PUT запрос', () => {
    instance.put("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("PUT");
  })
  
  it('Оправляется DELETE запрос', () => {
    instance.delete("/user", {});
    
    const [request] = requests;
    
    expect(request.method).to.eq("DELETE");
  })
})
