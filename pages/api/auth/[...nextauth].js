import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      image: '/quiniebla.webp',
      credentials: {
        email: { label: "Email", type: "email" },
        verificationCode: { label: "Verification Code", type: "text" }
      },
      async authorize(credentials) {
        try {
          // Validate required fields
          if (!credentials?.email || !credentials?.verificationCode) {
            throw new Error('Email and verification code are required');
          }

          // Use API_URL environment variable instead of NEXT_PUBLIC_API_URL
          const data = credentials.verifyResponse;

          if (!data) {
            throw new Error(data.error || 'Invalid verification code');
          }

          // If verification successful, return user object
          return {
            id: credentials.user,
            email: credentials.email,
            // Add any other user properties you need from your verification response
          };
        } catch (error) {
          console.error('Auth Error:', error);
          throw new Error(error.message || 'Authentication failed');
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions); 
