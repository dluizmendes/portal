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
    async signIn({ user, account, profile }) {
      // Opcional: restrinja a apenas seu email
      // if (user.email !== 'seu-email@exemplo.com') {
      //   return false
      // }
      return true
    },
  },
})

export { handler as GET, handler as POST }
