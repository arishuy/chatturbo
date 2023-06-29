import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/user';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';

export const authOptions =  {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials) {
                //Check if the user exists.
                await connect();

                try {
                    const user = await User.findOne({
                        username: credentials.username,
                    });

                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isPasswordCorrect) {
                            return user;
                        } else {
                            throw new Error('Wrong Credentials!');
                        }
                    } else {
                        throw new Error('User not found!');
                    }
                } catch (err) {
                    throw new Error(err);
                }
            },
        }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        return { ...token, ...user };
      },
      async session({ session, token }) {
        session.user = token;
        return session;
      },
    },
    pages: {
        signIn: '/login',
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
