import { queryStringify } from "./functions";

const METHODS = {
 GET: "GET",
 POST: "POST",
 PUT: "PUT",
 DELETE: "DELETE",
};

type Options = {
 method: string;
 data?: any;
 headers?: any;
 timeout: number;
};

const initialOptions: Options = {
 method: "",
 timeout: 5000,
};



class HTTPTransport {
 get = (url: string, options: Options = initialOptions) => {
  const parsedUrl = !!options.data ? `${url}${queryStringify(options.data)}` : url
  return this.request(parsedUrl, {...options, method: METHODS.GET});
 };

 post = (url: string, options: Options = initialOptions) => {
  return this.request(url, {...options, method: METHODS.POST});
 };

 put = (url: string, options: Options = initialOptions) => {
  return this.request(url, {...options, method: METHODS.PUT});
 };

 delete = (url: string, options: Options = initialOptions) => {
  return this.request(url, {...options, method: METHODS.DELETE});
 };

 request = (url: string, options: Options = initialOptions) => {
  const {headers = {}, method, data} = options;

  return new Promise((resolve, reject) => {
   if (!method) {
    reject("No method");
    return;
   }

   const xhr = new XMLHttpRequest();
  

   xhr.open(method, url);

   Object.keys(headers).forEach((key: string) => {
    xhr.setRequestHeader(key, headers[key]);
   });

   xhr.onload = () => {
    resolve(xhr);
   };

   xhr.onabort = reject;
   xhr.onerror = reject;

   xhr.timeout = options.timeout;
   xhr.ontimeout = reject;

   if (!data) {
    xhr.send();
   } else {
    xhr.send(data);
   }
  });
 };
}
