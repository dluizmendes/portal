export { default } from "next-auth/middleware"

export const config = {
  matcher: ['/dash/:path*', '/interview-notes/:path*']
}
