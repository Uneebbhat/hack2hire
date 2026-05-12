import { APIResponse } from "@/types/response-types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");

    return NextResponse.json<APIResponse>(
      {
        success: true,
        status: 200,
        message: "Logged out successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 500,
          error: `Internal Server Error: ${error.message}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json<APIResponse>(
      {
        success: false,
        status: 500,
        error: `An unknown error occurred: ${error}`,
      },
      { status: 500 },
    );
  }
}
