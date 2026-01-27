import { NextResponse } from 'next/server'

const USERNAME = process.env.GITHUB_USERNAME || 'dluizmendes'
const TOKEN = process.env.GITHUB_TOKEN

export const revalidate = 600 // 10 minutes

export async function GET() {
  const headers: Record<string, string> = {
    'User-Agent': 'next-portfolio'
  }
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`

  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/events/public`, {
      headers,
      next: { revalidate },
    })

    if (!res.ok) {
      return NextResponse.json({ events: [], error: 'GitHub API error' }, { status: res.status })
    }

    const events = await res.json()
    const mapped = (events || [])
      .filter((e: any) => ['PushEvent', 'CreateEvent'].includes(e.type))
      .slice(0, 5)
      .map((e: any) => {
        const repo = e.repo?.name
        const time = e.created_at
        if (e.type === 'PushEvent') {
          const commits = e.payload?.commits?.map((c: any) => c.message).slice(0, 2) || []
          return { type: 'push', repo, time, commits }
        }
        if (e.type === 'CreateEvent') {
          return { type: 'create', repo, time, ref: e.payload?.ref }
        }
        return { type: e.type, repo, time }
      })

    return NextResponse.json({ events: mapped })
  } catch (err) {
    return NextResponse.json({ events: [], error: 'Failed to fetch GitHub activity' }, { status: 500 })
  }
}
