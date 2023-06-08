import {queryStringify} from "../utils/functions";
import {API_URL} from "../utils/constants";

enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface Options {
  method?: keyof typeof METHODS;
  data?: unknown;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

type HTTPRequest = (url: string, options?: Options) => Promise<unknown>;

export default class HTTPTransport {
  static API_URL = API_URL;
  protected url: string;

  constructor(endpoint: string) {
    this.url = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get: HTTPRequest = (url, options = {}) => {
    const parsedUrl = options.data ? `${url}${queryStringify(options.data as Record<string, string>)}` : url;
    return this.request(parsedUrl, {...options});
  };

  post: HTTPRequest = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.POST});
  };

  put: HTTPRequest = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.PUT});
  };

  delete: HTTPRequest = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE});
  };

  request = (url: string, options: Options = {method: "GET"}) => {
    const {headers = {}, method, data} = options;

    const isFormData = headers?.["Content-Type"] === "multipart/form-data";

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method || METHODS.GET, `${this.url}${url}`);

      if (!isFormData) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
          if (!isFormData) {
            xhr.setRequestHeader(key, value);
          }
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.ontimeout = reject;
      xhr.onerror = reject;
      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (!data || method === METHODS.GET) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data as XMLHttpRequestBodyInit);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
