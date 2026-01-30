'use client'

import { Languages, TrendingUp, Target, Award, Calendar, Globe } from 'lucide-react'

export default function LanguagePage() {
  // EF SET Certificate Data - 60/100 (B2 Upper Intermediate)
  const currentScore = 60
  const currentLevel = 'B2'
  const targetLevel = 'C1'
  const targetScore = 71 // Minimum for C1
  const certDate = 'January 2026'
  const certUrl = 'https://cert.efset.org/FFtR65'

  const cefrLevels = [
    { level: 'A1', name: 'Beginner', min: 1, max: 30, color: 'bg-red-500' },
    { level: 'A2', name: 'Elementary', min: 31, max: 40, color: 'bg-orange-500' },
    { level: 'B1', name: 'Intermediate', min: 41, max: 50, color: 'bg-yellow-500' },
    { level: 'B2', name: 'Upper Intermediate', min: 51, max: 60, color: 'bg-blue-500' },
    { level: 'C1', name: 'Advanced', min: 61, max: 70, color: 'bg-purple-500' },
    { level: 'C2', name: 'Proficient', min: 71, max: 100, color: 'bg-emerald-500' },
  ]

  const progressToTarget = ((currentScore / targetScore) * 100).toFixed(1)
  const pointsNeeded = targetScore - currentScore

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
            <Languages className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">English Proficiency Tracker</h1>
            <p className="text-slate-400 text-sm">Journey to C1 Advanced Level</p>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-700/50 rounded-xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-8 h-8 text-blue-400" />
                <h2 className="text-2xl font-bold text-blue-100">Current Level: {currentLevel}</h2>
              </div>
              <p className="text-blue-200 text-lg mb-1">Upper Intermediate</p>
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                EF SET Certificate - {certDate}
              </p>
            </div>
            <div className="text-center md:text-right">
              <div className="text-6xl font-bold text-blue-400 mb-2">{currentScore}</div>
              <p className="text-slate-400">out of 100</p>
              <a
                href={certUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
              >
                <Globe className="w-4 h-4" />
                View Certificate
              </a>
            </div>
          </div>
        </div>

        {/* Progress to Target */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold">Target: C1 Advanced</h3>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">Progress to Target</span>
                <span className="text-sm font-semibold text-purple-400">{progressToTarget}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressToTarget}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Points needed:</span>
              <span className="text-2xl font-bold text-purple-400">+{pointsNeeded}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-semibold">Journey Ahead</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                  B2 - {currentScore}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                  C1 - {targetScore}+
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Ultimate Goal</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-semibold">
                  C2 - 71+
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CEFR Scale Visual */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Languages className="w-5 h-5 text-slate-400" />
            CEFR Scale (Common European Framework)
          </h3>
          <div className="space-y-3">
            {cefrLevels.map((level) => {
              const isCurrentLevel = level.level === currentLevel
              const isTargetLevel = level.level === targetLevel
              const isPassed = currentScore >= level.min

              return (
                <div
                  key={level.level}
                  className={`relative flex items-center gap-4 p-4 rounded-lg border transition ${
                    isCurrentLevel
                      ? 'bg-blue-500/20 border-blue-500'
                      : isTargetLevel
                      ? 'bg-purple-500/10 border-purple-500/50'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full ${level.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {level.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-100">{level.name}</h4>
                      {isCurrentLevel && (
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">You are here</span>
                      )}
                      {isTargetLevel && (
                        <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">Target</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">Score range: {level.min} - {level.max}</p>
                  </div>
                  {isPassed && !isCurrentLevel && (
                    <div className="text-emerald-400">
                      <Award className="w-6 h-6" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">What B2 Upper Intermediate Means</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                What You Can Do
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Understand complex texts on concrete and abstract topics</li>
                <li>• Interact with native speakers with fluency and spontaneity</li>
                <li>• Produce clear, detailed text on a wide range of subjects</li>
                <li>• Explain viewpoints on topical issues</li>
                <li>• Work effectively in an English-speaking professional environment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full" />
                To Reach C1 Advanced
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Express ideas fluently without searching for expressions</li>
                <li>• Use language flexibly for social, academic, and professional purposes</li>
                <li>• Produce clear, well-structured, detailed text on complex subjects</li>
                <li>• Understand a wide range of demanding, longer texts</li>
                <li>• Recognize implicit meaning and nuanced communication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
          <p className="text-sm text-slate-400">
            📊 This dashboard tracks English proficiency based on the{' '}
            <a href="https://www.efset.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              EF SET (EF Standard English Test)
            </a>
            {' '}aligned with the CEFR framework.
          </p>
        </div>
      </div>
    </div>
  )
}
