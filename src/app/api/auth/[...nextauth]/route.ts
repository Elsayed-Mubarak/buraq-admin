import axios from "axios";
import NextAuth, { AuthOptions, Session, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Extend the default Session interface.
interface MySession extends Session {
  user: DefaultSession["user"] & {
    id: string;
    role: string;
  };
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
            `${process.env.BASE_URL}/api/admin/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            { withCredentials: true }
          );

          if (response.status === 200) {
            return response.data.user;
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
      if (user) {
        // Check if 'user' is of your custom 'User' type before accessing 'role'
        if ("role" in user) { // Type guard using "in" operator
          token.sub = user.id;
          token.role = user.role;  // Access is now safe
          token.name = user.name;
          token.email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }): Promise<MySession> {
      if (token) {
        (session.user as MySession['user']).id = token.sub as string;
        (session.user as MySession['user']).role = token.role as string;
      }
      return session as MySession;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
