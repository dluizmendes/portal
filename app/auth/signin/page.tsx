'use client'

import { signIn } from 'next-auth/react'
import { Github, Lock } from 'lucide-react'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-slate-100 mb-2">
            Área Restrita
          </h1>
          <p className="text-center text-slate-400 mb-8">
            Esta página é privada. Faça login para continuar.
          </p>

          {/* Login Button */}
          <button
            onClick={() => signIn('github', { callbackUrl: '/dash' })}
            className="w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-slate-100 px-6 py-3 rounded-lg transition-all duration-200 font-medium border border-slate-700 hover:border-slate-600 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <Github className="w-5 h-5" />
            Entrar com GitHub
          </button>

          {/* Info */}
          <p className="text-xs text-slate-500 text-center mt-6">
            Apenas usuários autorizados têm acesso a esta área.
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a href="/" className="text-sm text-slate-400 hover:text-slate-300 transition-transform duration-200 hover:-translate-y-0.5 inline-flex">
            ← Voltar para o início
          </a>
        </div>
      </div>
    </div>
  )
}
