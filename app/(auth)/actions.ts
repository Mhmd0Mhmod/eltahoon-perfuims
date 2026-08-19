"use server";

import {
  ForgotPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SignInSchema,
} from "@/features/auth/schema";
import { nextServerAPI } from "@/lib/nextServerAPI";
import { api } from "@/lib/springAPI";
import { APIResponse, IAPIResponse } from "@/types/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function loginAction(
  credentials: SignInSchema,
): Promise<IAPIResponse<{ token: string; userProfile: User }>> {
  try {
    const response = await api.post("auth/login", credentials);
    const { token, userProfile } = response.data;

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });
    return APIResponse.success({ token, userProfile });
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function registerAction(formData: RegisterSchema) {
  try {
    const response = await api.post("auth/register", formData);
    return {
      success: true,
      data: response.data.user,
    };
  } catch (error) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
}
export async function forgotPassword(data: ForgotPasswordSchema) {
  try {
    await api.post("auth/forgot-password", data);
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
}

export async function resetPassword(data: ResetPasswordSchema) {
  try {
    const response = await api.post("auth/reset-password", data);
    return {
      success: true,
      data: undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: "An unknown error occurred",
    };
  }
}
export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  return {
    success: true,
  };
}
