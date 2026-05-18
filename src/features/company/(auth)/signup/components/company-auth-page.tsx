"use client";

import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AtSignIcon, Lock, Building2, Phone, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useSignupCompany from "../hooks/useCompanySignup";
import { Spinner } from "@/components/ui/spinner";

export function CompanyAuthSignupPage() {
  const { formData, handleOnChange, handleOnSubmit, loading } =
    useSignupCompany();

  return (
    <div className="relative w-full md:h-screen md:overflow-hidden">
      <Particles
        className="absolute inset-0"
        color="#666666"
        ease={20}
        quantity={120}
      />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-8">
        <div className="mx-auto space-y-4 sm:w-sm">
          <div className="flex flex-col space-y-1">
            <h1 className="font-bold text-2xl tracking-wide">
              Sign Up Your Company
            </h1>
            <p className="text-base text-muted-foreground">
              Register your company for Hack2Hire!
            </p>
          </div>
          <div className="space-y-2">
            <form onSubmit={handleOnSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Acme Corporation"
                      type="text"
                      name="companyName"
                      id="companyName"
                      onChange={handleOnChange}
                      value={formData.companyName}
                    />
                    <InputGroupAddon align="inline-start">
                      <Building2 />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="companyEmail">Company Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="hr@acmecorp.com"
                      type="email"
                      name="companyEmail"
                      id="companyEmail"
                      onChange={handleOnChange}
                      value={formData.companyEmail}
                    />
                    <InputGroupAddon align="inline-start">
                      <AtSignIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="companyPhone">Contact Number</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="+1 800 555 0123"
                      type="tel"
                      name="companyPhone"
                      id="companyPhone"
                      onChange={handleOnChange}
                      value={formData.companyPhone}
                    />
                    <InputGroupAddon align="inline-start">
                      <Phone />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="website">Website</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="www.acmecorp.com"
                      type="url"
                      name="website"
                      id="website"
                      onChange={handleOnChange}
                      value={formData.website}
                    />
                    <InputGroupAddon align="inline-start">
                      <Globe />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="Password"
                      type="password"
                      name="password"
                      id="password"
                      onChange={handleOnChange}
                      value={formData.password}
                    />
                    <InputGroupAddon align="inline-start">
                      <Lock />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Button
                  disabled={
                    loading ||
                    !formData.companyName ||
                    !formData.companyEmail ||
                    !formData.companyPhone ||
                    !formData.website ||
                    !formData.password
                  }
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Register
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </FieldGroup>
            </form>

            <Separator className="my-4" />

            <p className="text-center">
              Already have a company account?{" "}
              <Link href={"/company/login"} className="underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
