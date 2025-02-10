import { signIn } from "next-auth/react";
import Cookies from 'js-cookie';

export const login = async (email: string, password: string) => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  // Set the auth_token cookie
  if (result?.ok) {
    const session = await fetch("/api/auth/session").then(res => res.json());
    if (session?.authToken) {
      Cookies.set('auth_token', session.authToken, { expires: 1, path: '/' });
    }
  }

  return result;
};
