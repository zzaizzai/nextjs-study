import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
require("dotenv").config();

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret,
        }),
    ],
    secret: process.env.secret
};

export default NextAuth(authOptions); 