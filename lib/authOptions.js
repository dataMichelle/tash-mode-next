import GoogleProvider from "next-auth=providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign in

    async signIn({profile}) {
      // 1. Connect to the database
      // 2. Check if the user exists
      // 3. If not, create user
      // 4. Return true to allow sign in
},
// Session callback function that modifies the session object
     // 1. Get user from database
    // 2. Assign user id from the session
    // 3. Return the updated session object
  }
