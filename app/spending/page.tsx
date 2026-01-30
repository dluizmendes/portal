'use client'

import { useEffect, useState } from 'react'
import { Trash2, TrendingDown, Wallet, Users, Mars, Venus } from 'lucide-react'

interface Expense {
  id: string
  amount: number
  description: string
  spentBy: 'douglas' | 'tamires'
  date: string
}

export default function SpendingPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [spentBy, setSpentBy] = useState<'douglas' | 'tamires'>('douglas')
  const [isLoaded, setIsLoaded] = useState(false)
  const [useDatabase, setUseDatabase] = useState(false)

  // Configuration
  const DOUGLAS_LIMIT = 1397
  const TAMIRES_LIMIT = 700
  const TOTAL_LIMIT = DOUGLAS_LIMIT + TAMIRES_LIMIT

  // Load expenses from API or localStorage
  useEffect(() => {
    const loadExpenses = async () => {
      // Always try to load from API first
      try {
        const response = await fetch('/api/expenses')
        if (response.ok) {
          const data = await response.json()
          const mappedExpenses = data.map((e: any) => ({
            id: e.id,
            amount: parseFloat(e.amount),
            description: e.description || '',
            spentBy: e.spent_by,
            date: e.date,
          }))
          setExpenses(mappedExpenses)
          setUseDatabase(true)
          setIsLoaded(true)
          return
        } else if (response.status === 503 || response.status === 401) {
          // Database not configured or unauthorized, use localStorage
          console.log('Database not available, using localStorage:', response.status)
          setUseDatabase(false)
        } else {
          const error = await response.text()
          console.warn('API error:', response.status, error)
          setUseDatabase(false)
        }
      } catch (error) {
        console.warn('API not available, falling back to localStorage:', error)
        setUseDatabase(false)
      }

      // Fallback to localStorage
      const saved = localStorage.getItem('spending_expenses')
      if (saved) {
        try {
          setExpenses(JSON.parse(saved))
        } catch (e) {
          console.error('Error loading expenses:', e)
        }
      }
      setIsLoaded(true)
    }

    if (isLoaded === false) {
      loadExpenses()
    }
  }, [])

  // Save to localStorage as fallback, and to database if enabled
  useEffect(() => {
    if (!isLoaded) return

    // Always save to localStorage as backup
    localStorage.setItem('spending_expenses', JSON.stringify(expenses))
  }, [expenses, isLoaded])

  // Calculate totals
  const douglasTotal = expenses
    .filter((e) => e.spentBy === 'douglas')
    .reduce((sum, e) => sum + e.amount, 0)

  const tamiresTotal = expenses
    .filter((e) => e.spentBy === 'tamires')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalSpent = douglasTotal + tamiresTotal
  const totalRemaining = TOTAL_LIMIT - totalSpent
  const douglasRemaining = DOUGLAS_LIMIT - douglasTotal
  const tamiresRemaining = TAMIRES_LIMIT - tamiresTotal

  // Add expense
  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !description) return

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description,
      spentBy,
      date: new Date().toLocaleDateString('pt-BR'),
    }

    // Try to save to database if available
    if (useDatabase) {
      try {
        const response = await fetch('/api/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: newExpense.amount,
            description: newExpense.description,
            spent_by: newExpense.spentBy,
            date: new Date().toISOString().split('T')[0],
          }),
        })
        if (response.ok) {
          const data = await response.json()
          const expense: Expense = {
            id: data.id,
            amount: parseFloat(data.amount),
            description: data.description,
            spentBy: data.spent_by,
            date: data.date,
          }
          setExpenses([expense, ...expenses])
          setAmount('')
          setDescription('')
          return
        } else {
          const errorData = await response.text()
          console.error('Failed to save to database:', response.status, errorData)
        }
      } catch (error) {
        console.error('Failed to save to database:', error)
      }
    }

    // Fallback to localStorage
    setExpenses([newExpense, ...expenses])
    setAmount('')
    setDescription('')
  }

  // Delete expense
  const handleDelete = async (id: string) => {
    if (useDatabase) {
      try {
        const response = await fetch(`/api/expenses/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          setExpenses(expenses.filter((e) => e.id !== id))
          return
        }
      } catch (error) {
        console.error('Failed to delete from database:', error)
      }
    }

    // Fallback to localStorage
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  // Reset data
  const handleReset = () => {
    if (confirm('Tem certeza que deseja limpar todos os gastos?')) {
      setExpenses([])
    }
  }

  // Calculate next reset date
  const today = new Date()
  const nextReset = new Date(today.getFullYear(), today.getMonth(), 27)
  if (today.getDate() >= 27) {
    nextReset.setMonth(nextReset.getMonth() + 1)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
            <Wallet className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Ticket Alimentação</h1>
            <p className="text-slate-400 text-sm">Controle compartilhado de gastos</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Total Summary */}
          <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-700/50 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-semibold">Resumo Geral</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Limite Total</span>
                <span className="text-2xl font-bold text-emerald-400">R$ {TOTAL_LIMIT.toFixed(2)}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${(totalSpent / TOTAL_LIMIT) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Gasto</p>
                  <p className="text-lg font-bold text-red-400">R$ {totalSpent.toFixed(2)}</p>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg">
                  <p className="text-xs text-slate-500 mb-1">Disponível</p>
                  <p className={`text-lg font-bold ${totalRemaining < 100 ? 'text-red-400' : 'text-emerald-400'}`}>
                    R$ {totalRemaining.toFixed(2)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center">
                Próximo crédito: {nextReset.toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          {/* Individual Limits */}
          <div className="space-y-4">
            {/* Douglas */}
            <div className="bg-slate-900 border border-blue-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-100 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="inline-flex items-center gap-2">
                  <Mars className="w-4 h-4 text-blue-300" />
                  Douglas
                </span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Limite</span>
                  <span className="font-semibold">R$ {DOUGLAS_LIMIT.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Gasto</span>
                  <span className="font-semibold text-red-400">R$ {douglasTotal.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all"
                    style={{ width: `${(douglasTotal / DOUGLAS_LIMIT) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Disponível</span>
                  <span className={`font-bold ${douglasRemaining < 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    R$ {douglasRemaining.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Tamires */}
            <div className="bg-slate-900 border border-purple-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-purple-100 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="inline-flex items-center gap-2">
                  <Venus className="w-4 h-4 text-purple-300" />
                  Tamires
                </span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Limite</span>
                  <span className="font-semibold">R$ {TAMIRES_LIMIT.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Gasto</span>
                  <span className="font-semibold text-red-400">R$ {tamiresTotal.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all"
                    style={{ width: `${(tamiresTotal / TAMIRES_LIMIT) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">Disponível</span>
                  <span className={`font-bold ${tamiresRemaining < 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                    R$ {tamiresRemaining.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Registrar Gasto</h2>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Quem gastou?</label>
                <select
                  value={spentBy}
                  onChange={(e) => setSpentBy(e.target.value as 'douglas' | 'tamires')}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                >
                  <option value="douglas">Douglas</option>
                  <option value="tamires">Tamires</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-2">Descrição</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Supermercado, Padaria..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 placeholder:text-slate-600"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition font-medium"
              >
                Registrar Gasto
              </button>
              {expenses.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                >
                  Limpar Tudo
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Expenses List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Histórico de Gastos</h2>
          {expenses.length === 0 ? (
            <p className="text-slate-400 text-center py-8">Nenhum gasto registrado ainda</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg border ${
                    expense.spentBy === 'douglas'
                      ? 'bg-blue-500/5 border-blue-700/30'
                      : 'bg-purple-500/5 border-purple-700/30'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          expense.spentBy === 'douglas'
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          {expense.spentBy === 'douglas' ? (
                            <Mars className="w-3.5 h-3.5" />
                          ) : (
                            <Venus className="w-3.5 h-3.5" />
                          )}
                          {expense.spentBy === 'douglas' ? 'Douglas' : 'Tamires'}
                        </span>
                      </span>
                      <span className="text-slate-300 break-words">
                        {expense.description}
                      </span>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {expense.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-lg font-bold text-red-400">
                      -R$ {expense.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition"
                      title="Deletar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
