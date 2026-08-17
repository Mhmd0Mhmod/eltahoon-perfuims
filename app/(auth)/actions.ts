"use server";

import {
  ForgotPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
  SignInSchema,
} from "@/features/auth/schema";
import { api } from "@/lib/api";
import { APIResponse, IAPIResponse } from "@/types/api";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function loginAction(
  credentials: SignInSchema,
): Promise<IAPIResponse<{ token: string; uesrProfile: User }>> {
  try {
    const response = await api.post("auth/login", credentials);
    const { token, uesrProfile } = response.data;
    const cookiesStore = await cookies();
    cookiesStore.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return APIResponse.success({ token, uesrProfile });
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function fetchUserProfile() {
  try {
    const response = await api.get<User>("users/me");
    const { data } = response;
    return APIResponse.success({
      data,
    });
  } catch (e) {
    return APIResponse.error(e);
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
