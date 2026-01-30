'use client'

import AuthProvider from './components/AuthProvider'
import { ThemeProvider } from './components/ThemeProvider'
import { CommandPaletteProvider } from './components/CommandPaletteProvider'
import { LocaleProvider } from './components/LocaleContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <AuthProvider>
          <CommandPaletteProvider>
            {children}
          </CommandPaletteProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
