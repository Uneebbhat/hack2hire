import CompanySignupSchema from "@/features/company/(auth)/schema/company-signup-schema.schema";
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

    // Validate the request body using company schema
    const validateBody = CompanySignupSchema.safeParse(body);
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

    // Note spelling! The fields must match what prisma expects due to typos in schema.
    // The field in prisma is 'comapnyName' and 'companyEmail'
    const { companyName, companyEmail, companyPhone, website, password } =
      validateBody.data;

    // Check if company email already exists (unique constraint)
    const emailTaken = await prisma.company.findUnique({
      where: {
        companyEmail,
      },
    });
    if (emailTaken) {
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

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create the company
    const newCompany = await prisma.company.create({
      data: {
        companyName: companyName,
        companyEmail: companyEmail,
        companyPhone,
        website,
        password: hashedPassword,
      },
    });

    if (!newCompany) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          status: 500,
          error: "An error occurred while creating your company account",
        },
        { status: 500 },
      );
    }

    // Generate access token (payload can be customized)
    const accessToken = await generateAccessToken({
      id: newCompany.id,
      email: newCompany.companyEmail,
      name: newCompany.companyName,
      type: "company",
    });

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json<APIResponse>(
      {
        success: true,
        status: 201,
        message: "Company account created successfully",
        data: {
          company: newCompany,
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
          error: `An unknown error occurred: ${error}`,
        },
        { status: 500 },
      );
    }
  }
}
