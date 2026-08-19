import { AxiosError } from "axios";

export interface IAPISuccess<T> {
  success: true;
  data: T;
  message?: string;
}
export interface IAPIError {
  success: false;
  message: string;
  status?: number;
}
export type IAPIResponse<T> = IAPISuccess<T> | IAPIError;
export class APIResponse {
  static success<T>(data: T, message?: string): IAPISuccess<T> {
    return {
      success: true,
      data,
      message,
    };
  }
  static error(error: AxiosError | Error | unknown): IAPIError {
    let message = "An unknown error occurred";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    const status = error instanceof AxiosError ? error.response?.status : 500;

    return {
      success: false,
      message,
      status,
    };
  }
}
