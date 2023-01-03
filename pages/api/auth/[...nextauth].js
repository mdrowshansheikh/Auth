import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import Users from '../../../models/userSchema';
import { compare } from 'bcryptjs';
import connectDB from '../../../database/connectDB';

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        connectDB().catch((error) => {
          error: 'Connection faild';
        });
        const result = await Users.findOne({
          email: credentials.email,
        });
        if (!result) {
          throw new Error('No user found with email please signup!');
        }
        // compare password ============>
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        // check incorrect password or email;
        if (!checkPassword || credentials.email !== result.email) {
          throw new Error(' email or password dose not match');
        }
        return result;
      },
    }),
  ],
});
