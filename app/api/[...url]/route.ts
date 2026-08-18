import { getSpringAPI } from "@/lib/springAPI";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ url: string[] }> },
) {
  try {
    const { url } = await params;
    const resonse = await getSpringAPI(request).get(url.join("/"));
    return NextResponse.json(resonse.data, { status: resonse.status });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.response?.status || 500 },
      );
    }
    if (error instanceof Error)
      return NextResponse.json(
        { message: error.message },
        { status: (error.cause as number) || 500 },
      );
  }
  return NextResponse.json(
    { message: "An unknown error occurred" },
    { status: 500 },
  );
}
