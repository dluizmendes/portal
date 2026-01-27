import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // Descomente para restringir acesso apenas ao seu email:
  // callbacks: {
  //   async signIn({ user }) {
  //     return user.email === 'seu-email@exemplo.com'
  //   },
  // },
})

export { handler as GET, handler as POST }
