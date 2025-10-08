import NextAuth from 'next-auth';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            },
            from: process.env.EMAIL_FROM
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin"
            return token
        },
        async signIn(user) {
            if (user.account.provider === 'google' && user.profile.email_verified === false) {
              return Promise.resolve(false);
            }
            return Promise.resolve(true);
          },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
})