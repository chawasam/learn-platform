'use client'
import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ComponentName, DemoStep } from '@/types/curriculum'
import { INTERACTIVE_COMPONENTS } from '@/components/interactive/registry'

interface Props {
  component: ComponentName
  config: Record<string, unknown>
  steps: DemoStep[]
}

export default function DemoTab({ component, config, steps }: Props) {
  const [step, setStep] = useState(0)
  const [resetKey, setResetKey] = useState(0)

  const Component = INTERACTIVE_COMPONENTS[component]
  const currentStep = steps[step]
  const merged = currentStep?.config ? { ...config, ...currentStep.config } : config

  const goNext = () => { if (step < steps.length - 1) setStep(s => s + 1) }
  const goPrev = () => { if (step > 0) setStep(s => s - 1) }
  const restart = () => { setStep(0); setResetKey(k => k + 1) }

  return (
    <div className="flex flex-col gap-5">
      {/* Step instruction */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-5 py-4 border border-blue-100"
        >
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center justify-center">
              {step + 1}
            </span>
            <p className="text-base font-medium leading-relaxed pt-0.5" style={{ color: '#1E3A5F' }}>
              {currentStep?.instruction}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className="flex-1 h-1.5 rounded-full transition-colors"
            style={{ background: i <= step ? '#4F80FF' : '#E5E7EB' }}
          />
        ))}
      </div>

      {/* Interactive component */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex justify-center min-h-48">
        <Suspense fallback={
          <div className="flex items-center justify-center w-full">
            <div className="animate-spin w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full" />
          </div>
        }>
          <Component key={`${resetKey}-${step}`} {...merged} />
        </Suspense>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goPrev}
          disabled={step === 0}
          className="px-5 py-2.5 rounded-xl border-2 border-gray-200 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-30"
        >
          ← ก่อนหน้า
        </button>
        <button
          onClick={restart}
          className="px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors"
          style={{ color: 'var(--muted)' }}
        >
          🔄 เริ่มใหม่
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={goNext}
            className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors"
          >
            ถัดไป →
          </button>
        ) : (
          <span className="px-5 py-2.5 rounded-xl bg-green-500 text-white font-semibold text-sm">
            จบแล้ว 🎉
          </span>
        )}
      </div>
    </div>
  )
}
