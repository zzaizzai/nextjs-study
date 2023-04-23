import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import config from "./config";


export const authOptions = {
    providers: [
        GithubProvider({
            clientId: config.clientId,
            clientSecret: config.clientSecret,
        }),
    ],
    secret: config.secret
};
export default NextAuth(authOptions); 