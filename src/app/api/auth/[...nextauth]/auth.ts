import axios from "axios";
import { AuthOptions, Session, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  authToken?: string;
}

interface ExtendedSession extends Session {
  user: DefaultSession["user"] & {
    id: string;
    role: string;
  };
  authToken?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "PASSWORD", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        try {
          const response = await axios.post<{ user: User }>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            { withCredentials: true }
          );

          if (response.status === 200) {
            console.log(".......res..........", response.headers["set-cookie"]);
            const authToken = response.headers["set-cookie"]?.[0]?.split(';')[0].split('=')[1];
            return { ...response.data.user, authToken };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Error during login:", error);
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(
              `Login failed: ${error.response.status} - ${
                error.response.data?.message || "Unknown error"
              }`
            );
          } else {
            throw new Error(
              "Login failed: " +
                (error instanceof Error ? error.message : "Unknown error")
            );
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user && typeof user === 'object' && 'role' in user) {
        token.sub = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.authToken = (user as User).authToken;
      }
      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          role: token.role as string,
        },
        authToken: token.authToken as string,
      };
    },
  },
};
