import { getSpringAPI } from "@/lib/springAPI";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ url: string[] }>;
};

async function getBody(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType) {
    return undefined;
  }
  if (contentType.includes("application/json")) {
    const text = await request.text();
    if (!text) {
      return undefined;
    }
    return JSON.parse(text);
  }
  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    return request.formData();
  }
  return request.text();
}

async function proxyRequest(
  context: RouteContext,
  request: NextRequest,
  method: "get" | "post" | "patch" | "delete",
) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const { url } = await context.params;
    const endpoint = url.join("/");
    const api = getSpringAPI(request);

    const config = {
      params: request.nextUrl.searchParams,
      headers: {
        "Content-Type": contentType,
      },
    };
    let response;
    if (method === "get") {
      response = await api.get(endpoint, config);
    } else if (method === "delete") {
      response = await api.delete(endpoint, config);
    } else {
      const body = await getBody(request);
      response = await api[method](endpoint, body, config);
    }

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || error.message,
          ...(error.response?.data || {}),
        },
        {
          status: error.response?.status || 500,
        },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(context, request, "get");
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(context, request, "post");
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(context, request, "patch");
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(context, request, "delete");
}
