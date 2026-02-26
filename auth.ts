import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import mongoose from 'mongoose';
import { connectDB, User } from '@/lib/db';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return false;
      }

      try {
        await connectDB();
        
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            _id: new mongoose.Types.ObjectId(),
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: new Date(),
          });
        }
      } catch (error) {
        console.error('Error in signIn callback (non-fatal):', error);
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id: string }).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const auth = () => getServerSession(authOptions);
