'use client'

import AuthProvider from './components/AuthProvider'
import { ThemeProvider } from './components/ThemeProvider'
import { CommandPaletteProvider } from './components/CommandPaletteProvider'
import { LocaleProvider } from './components/LocaleContext'
import NavMenu from './components/NavMenu'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <AuthProvider>
          <CommandPaletteProvider>
            <NavMenu />
            {children}
          </CommandPaletteProvider>
        </AuthProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
