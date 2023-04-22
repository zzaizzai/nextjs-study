import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: 'fb45884b3cdbd40ca9d8',
            clientSecret: '39c3f2a4d2d50e944f4a42bf169917fec95d10da',
        }),
    ],
    secret: 'jwt생성시쓰는암호'
};
export default NextAuth(authOptions); 