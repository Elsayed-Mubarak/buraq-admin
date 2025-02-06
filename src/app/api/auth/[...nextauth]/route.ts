import axios from "axios";
import { error } from "console";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { unauthorized } from "next/navigation";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "PASSWORD", type: "password" },
      },
      async authorize(credentials) {

        try {
          // Send the credentials to your backend API for validation
          const response = await axios.post(`${process.env.BASE_URL}/api/admin/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          }, { withCredentials: true }); // Make sure the backend is configured to handle cookies

          // If login is successful, return the user data
          if (response.status === 200) {
            console.log(response.data)
            const user = response.data.user;
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          } else {
            return null; // If login failed, return null
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null; // If error occurs, return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Custom login page
  },

  callbacks: {
    async session({ session, token }:any) {
      // Attach user data to the session
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }:any) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },

  unauthorized ()
  {
    
  }

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
