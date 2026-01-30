export { default } from "next-auth/middleware"

export const config = {
  matcher: ['/interview-notes/:path*', '/spending/:path*', '/language/:path*']
}
