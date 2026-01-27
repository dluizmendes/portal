'use client'

import AuthProvider from './components/AuthProvider'
import { ThemeProvider } from './components/ThemeProvider'
import { CommandPaletteProvider } from './components/CommandPaletteProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CommandPaletteProvider>
          {children}
        </CommandPaletteProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
