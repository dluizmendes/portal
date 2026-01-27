'use client'

import { useSearchParams } from 'next/navigation'
import { AlertCircle, Home } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = () => {
    switch (error) {
      case 'AccessDenied':
        return 'Você não tem permissão para acessar esta área.'
      case 'Configuration':
        return 'Erro na configuração de autenticação.'
      case 'Verification':
        return 'Token de verificação inválido ou expirado.'
      default:
        return 'Ocorreu um erro durante a autenticação.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-slate-900/50 backdrop-blur border border-red-900/50 rounded-lg p-8 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center text-slate-100 mb-2">
            Acesso Negado
          </h1>
          <p className="text-center text-slate-300 mb-8">
            {getErrorMessage()}
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-6 py-3 rounded-lg transition font-medium border border-slate-700 hover:border-slate-600"
            >
              <Home className="w-5 h-5" />
              Voltar para o Início
            </Link>
          </div>

          {/* Info */}
          <p className="text-xs text-slate-500 text-center mt-6">
            Se você acredita que isto é um erro, entre em contato com o administrador.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Carregando...</div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
