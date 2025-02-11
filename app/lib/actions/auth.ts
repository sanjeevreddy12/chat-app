import { Account, AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  token?: string | null;
}

export const authoptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: CustomUser;
      account: Account | null;
    }) {
      console.log("inside signin");
      try {
        const payload = {
          email: user.email!,
          name: user.name!,
          oauth_id: account?.providerAccountId!,
          provider: account?.provider!,
          image: user?.image,
        };
        console.log("payload", payload);

        const { data } = await axios.post("http://localhost:8000/api/auth/signin", payload);
        console.log("API response:", data);

        user.id = data?.user?.id?.toString();
        user.token = data?.user?.token;

        return true;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error("Axios Error:", error.response?.data);
          return false; // Prevent sign-in on error
        }
        return false; // Fallback error handling
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      console.log("token", token);
     
        session.user = token.user as CustomUser;
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
