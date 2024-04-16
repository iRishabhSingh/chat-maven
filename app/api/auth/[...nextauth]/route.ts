import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import connect from "@/utils/database";
import User from "@/models/User";

// Define authentication options
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        try {
          // Connect to the database
          await connect();

          // Find user by email
          const user = await User.findOne({ email: credentials.email });

          // If user exists, check password validity
          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            // If password is valid, return user
            if (isPasswordValid) {
              return user;
            }
          }
        } catch (error: any) {
          // Log and throw error if authorization fails
          throw new Error("Could not authorize user.");
        }

        // Return null if authorization fails
        return null;
      },
    }),
  ],
};

// Export authentication handler
const handler = NextAuth(authOptions);

// Expose handler for both GET and POST requests
export { handler as GET, handler as POST };
