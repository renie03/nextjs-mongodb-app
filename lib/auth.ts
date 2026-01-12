import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import connectToDB from "./connectToDB";
import { User } from "./models/user.model";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./schemas/auth.schema";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // session: { strategy: "jwt" },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    Credentials({
      authorize: async (credentials) => {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) {
            console.log(parsed.error.issues);
            return null;
          }

          const { username, password } = parsed.data;

          await connectToDB();

          const user = await User.findOne({ username });
          if (!user) throw new Error("Wrong credentials!");

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) throw new Error("Wrong credentials!");

          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log(account, profile);
      // return true;
      await connectToDB();

      if (account?.provider === "google") {
        try {
          const user = await User.findOne({ email: profile?.email });
          if (!user) {
            await User.create({
              name: profile?.name,
              email: profile?.email,
              image: profile?.picture,
            });
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      if (account?.provider === "github") {
        try {
          const user = await User.findOne({ email: profile?.email });
          if (!user) {
            await User.create({
              name: profile?.login,
              email: profile?.email,
              image: profile?.avatar_url,
            });
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      // console.log("token", token);
      // console.log("user", user);
      // return token;

      await connectToDB();
      if (user) {
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          token.id = existingUser._id.toString();
        }
      }

      if (token.id) {
        const existingUser = await User.findById(token.id);
        if (existingUser) {
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.image = existingUser.image || null;
          token.username = existingUser.username || null;
          token.isAdmin = existingUser.isAdmin;
        }
      }

      // console.log("token", token);
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.username = token.username;
      session.user.isAdmin = token.isAdmin;

      // console.log("session", session);
      return session;
    },
  },
});
