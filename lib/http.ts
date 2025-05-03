import Config from "react-native-config";
import { getAccesstoken } from "./utils";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type CustomOptions = RequestInit & {
     baseUrl?: string;
     authorization?: boolean;
}

const ENTITY_ERROR_STATUS = 422;
const UNAUTHORIZED_STATUS = 401;

export class HttpError extends Error {
     status: number;
     payload: {
          message: string;
          [key: string]: unknown;
     };

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     constructor({ message, status, payload }: { message: string; status: number; payload: any }) {
          super("HttpError: " + message);
          this.status = status;
          this.payload = payload;
     }
}

// export class GlobarError extends HttpError {
//      payload: ErrorResType;

//      constructor({ message, status, payload }: { message: string; status: number; payload: ErrorResType }) {
//           super({ message, status, payload });
//           this.payload = payload;
//      }
// }

// export class ValidationError extends HttpError {
//      payload: ErrorValidationResType;

//      constructor({ message, status, payload }: { message: string; status: number; payload: ErrorValidationResType }) {
//           super({ message, status, payload });
//           this.payload = payload;
//      }
// }


const request = async <Response>(method: HttpMethod, url: string, options?: CustomOptions | undefined) => {
     console.log("🚀 ~ options:", options)

     const body = options?.body;
     let baseHeaders: {
          [key: string]: string;
     } = {
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
     }

     if (options?.authorization) {
          const token = await getAccesstoken();
          baseHeaders = {
               ...baseHeaders,
               'Authorization': `Bearer ${token}`,
          }
     }

     const baseUrl = options?.baseUrl ?? process.env.EXPO_PUBLIC_SERVER_URL;

     const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

     console.log(`[HTTP] ${method} ${fullUrl}`);

     const res = await fetch(fullUrl, {
          ...options,
          headers: {
               ...baseHeaders,
               ...options?.headers,
          },
          body,
          method,
     });

     const resBody = res instanceof Response ? await res.json() : res;

     console.log("🚀 ~ file: http.ts:50 ~ request ~ resBody:", resBody)
     if (!res.ok) {
          const error = resBody;

          throw new HttpError({
               message: error.message,
               status: res.status,
               payload: error,
          });
          // if (res.status === ENTITY_ERROR_STATUS) {
          //      const error = resBody as ErrorValidationResType;
          //      throw new HttpError({
          //           message: error.message,
          //           status: res.status,
          //           payload: error,
          //      });
          // }
          // else {
          //      const error = resBody as ErrorResType;
          //      throw new HttpError({
          //           message: error.message,
          //           status: res.status,
          //           payload: error,
          //      });
          // }
     }

     const data = {
          status: res.status,
          payload: (baseUrl === '') ? resBody.payload : resBody,
     }

     return data;
}

export const http = {
     get: <Response>(url: string, options?: Omit<CustomOptions, 'body'>) => request<Response>('GET', url, options),
     post: <Response>(url: string, options?: CustomOptions) => request<Response>('POST', url, options),
     put: <Response>(url: string, options?: CustomOptions) => request<Response>('PUT', url, options),
     patch: <Response>(url: string, options?: CustomOptions) => request<Response>('PATCH', url, options),
     delete: <Response>(url: string, options?: CustomOptions) => request<Response>('DELETE', url, options),
}