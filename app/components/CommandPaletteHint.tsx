'use client'

import { useEffect } from 'react'
import { useCommandPalette } from './CommandPaletteProvider'

export default function CommandPaletteHint() {
  const { setOpen } = useCommandPalette()

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200)
    const closer = setTimeout(() => setOpen(false), 2600)
    return () => {
      clearTimeout(timer)
      clearTimeout(closer)
    }
  }, [setOpen])

  return null
}
