"use server";

import { signIn as nextAuthSignIn } from "next-auth/react";

export async function signIn(email: string, password: string) {
  const result = await nextAuthSignIn("credentials", {
    email,
    password,
    redirect: false,
  });

  return result;
}
