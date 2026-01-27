import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowedEmail = process.env.ALLOWED_EMAIL
      if (!allowedEmail) return true // Se não configurado, permite todos
      return user.email === allowedEmail
    },
  },
})

export { handler as GET, handler as POST }
