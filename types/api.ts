import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export interface IAPISuccess<T> {
  success: true;
  data: T;
}
export interface IAPIError {
  success: false;
  message: string;
  status?: number;
}
export type IAPIResponse<T> = IAPISuccess<T> | IAPIError;
export class APIResponse {
  static success<T>(data: T): IAPISuccess<T> {
    return {
      success: true,
      data,
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
