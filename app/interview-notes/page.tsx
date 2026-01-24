import { Metadata } from 'next'
import InterviewNotes from '../components/InterviewNotes'

export const metadata: Metadata = {
  title: 'Interview Notes - Douglas Mendes',
  description: 'Personal reference notes for technical and behavioral interviews',
  robots: 'noindex, nofollow',
}

export default function InterviewNotesPage() {
  return <InterviewNotes />
}
