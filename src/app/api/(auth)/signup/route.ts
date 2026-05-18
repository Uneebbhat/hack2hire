import UserSignupSchema from "@/features/(auth)/schema/user-signup-schema.schema";
import UserDTO from "@/dto/user-dto.dto";
import { generateAccessToken } from "@/helper/generateToken";
import { hashPassword } from "@/helper/passwordHashing";
import prisma from "@/lib/prisma";
import { APIResponse } from "@/types/response-types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const body = await req.json();

    const validateBody = UserSignupSchema.safeParse(body);
    if (validateBody.error) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 400,
          error: validateBody.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { name, email, password, username } = validateBody.data;

    const usernameAlreadyTaken = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (usernameAlreadyTaken) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 409,
          error: "Username already taken",
        },
        {
          status: 409,
        },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 409,
          error: "Email already in use",
        },
        {
          status: 409,
        },
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 500,
          error: "An error occurred while creating your account",
        },
        { status: 500 },
      );
    }

    const accessToken = await generateAccessToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      type: "user",
    });

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    const userDTO = new UserDTO(newUser);

    return NextResponse.json<APIResponse>(
      {
        success: true,
        status: 201,
        message: "Account created successfully",
        data: {
          newUser: userDTO,
          accessToken,
        },
      },
      { status: 201 },
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
    } else {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 500,
          error: `An unknown error occcurred: ${error}`,
        },
        { status: 500 },
      );
    }
  }
}
