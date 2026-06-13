// Shared score tiers for end-of-practice and exam summaries.
// Extracted from PracticeTab so ExamRunner reuses the exact same encouragement.

export type GradeTier = { emoji: string; title: string; color: string }

export function grade(pct: number): GradeTier {
  if (pct === 100) return { emoji: '🏆', title: 'เพอร์เฟกต์! เก่งมากกก', color: '#22C55E' }
  if (pct >= 70) return { emoji: '🌟', title: 'เยี่ยมมาก!', color: '#22C55E' }
  if (pct >= 40) return { emoji: '💪', title: 'ดีขึ้นได้อีก สู้ๆ', color: '#FF7A2F' }
  return { emoji: '📚', title: 'ลองทบทวนแล้วทำใหม่นะ', color: '#EF4444' }
}
