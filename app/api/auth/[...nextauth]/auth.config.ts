import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

// Emails permitidos para login
const ALLOWED_EMAILS = [
  process.env.ALLOWED_EMAIL,
  'tamires.lunardelle@gmail.com',
].filter(Boolean) as string[]

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      if (ALLOWED_EMAILS.length === 0) return true
      return ALLOWED_EMAILS.includes(user.email || '')
    },
  },
}

export default authOptions
