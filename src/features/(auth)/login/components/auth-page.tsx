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
import { AtSignIcon, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import useLogin from "../hooks/useLogin";
import { Spinner } from "@/components/ui/spinner";

export function AuthLoginPage() {
  const { formData, handleOnChange, handleOnSubmit, loading } = useLogin();
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
            <h1 className="font-bold text-2xl tracking-wide">Login</h1>
            <p className="text-base text-muted-foreground">
              Login to your Hack2Hire account.
            </p>
          </div>
          <div className="space-y-2">
            <form onSubmit={handleOnSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="johndoe@example.com"
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleOnChange}
                      value={formData.email}
                    />
                    <InputGroupAddon align="inline-start">
                      <AtSignIcon />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      placeholder="password"
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
                  disabled={loading || !formData.email || !formData.password}
                >
                  {loading ? (
                    <>
                      <Spinner />
                      Login
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </FieldGroup>
            </form>

            <Separator className="my-4" />

            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="underline">
                Signup
              </Link>
            </p>
          </div>
          {/* <p className="mt-8 text-muted-foreground text-sm">
            By clicking continue, you agree to our{" "}
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <a
              className="underline underline-offset-4 hover:text-primary"
              href="#"
            >
              Privacy Policy
            </a>
            .
          </p> */}
        </div>
      </div>
    </div>
  );
}
