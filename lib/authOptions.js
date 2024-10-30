import clientPromise from "@/lib/database";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const client = await clientPromise;
      const db = client.db("your_database_name");

      const userExists = await db
        .collection("users")
        .findOne({ email: profile.email });

      if (!userExists) {
        const username = profile.name.slice(0, 20);

        await db.collection("users").insertOne({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true;
    },
    async session({ session }) {
      const client = await clientPromise;
      const db = client.db("your_database_name");

      const user = await db
        .collection("users")
        .findOne({ email: session.user.email });

      session.user.id = user._id.toString();
      session.user.image = user.image; // Ensure the image is included in the session

      return session;
    },
  },
};

export default NextAuth(authOptions);
