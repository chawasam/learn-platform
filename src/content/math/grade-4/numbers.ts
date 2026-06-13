import type { ChapterV2 } from '@/types/curriculum'

// จำนวนนับมากกว่าแสน ป.4 — story (curriculum ref: math-thai-p456 p4-c01)
// หัวใจ: เชื่อม "ตัวเลข ↔ คำอ่านไทย" — สร้างเลขทีละหลัก เห็นคำอ่านไทยอัปเดตสด

const numbers: ChapterV2 = {
  version: 2,
  id: 'math-4-numbers',
  subject: 'math',
  grade: 4,
  chapter: 1,
  title: 'จำนวนนับมากกว่าแสน',
  icon: '🔢',
  slug: 'numbers-100000',
  scenes: [
    {
      id: 'intro',
      say: 'ดาวบนฟ้ามีเป็นแสนเป็นล้านดวง! 🌟 จำนวนใหญ่ๆ แบบนี้เราอ่านและเขียนกันยังไงนะ?',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 100000, readOnly: true },
      },
    },
    {
      id: 'places',
      say: 'แต่ละหลักมีชื่อ ดูจากขวาสุดไล่ไปซ้าย: หน่วย สิบ ร้อย พัน หมื่น แสน — ยิ่งไปทางซ้าย ค่ายิ่งมากขึ้น (แสนใหญ่สุดในบทนี้)',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 0, readOnly: true },
      },
    },
    {
      id: 'make-100000',
      say: 'มาลองสร้าง "หนึ่งแสน" กันเอง — กดปุ่ม + ที่หลักแสนให้ขึ้นเป็นเลข 1 ดูสิ',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 0 },
      },
      goal: { type: 'reach-value', key: 'value', value: 100000 },
      hint: 'กด + สีชมพูที่หลัก "แสน" หนึ่งครั้ง → จะได้ 100,000 อ่านว่า "หนึ่งแสน"',
    },
    {
      id: 'read-250000',
      say: 'ดูจำนวนนี้นะ 250,000 — หลักแสนมี 2 หลักหมื่นมี 5 ที่เหลือเป็น 0 หมด เลยอ่านว่า "สองแสนห้าหมื่น"',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 250000, readOnly: true },
      },
    },
    {
      id: 'make-250000',
      say: 'ตาเธอบ้าง! สร้าง 250,000 เอง — แสน 2, หมื่น 5, ที่เหลือปล่อยเป็น 0',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 0 },
      },
      goal: { type: 'reach-value', key: 'value', value: 250000 },
      hint: 'กดหลักแสนให้เป็น 2 แล้วกดหลักหมื่นให้เป็น 5',
    },
    {
      id: 'zero-skip',
      say: 'เคล็ดลับ! ดู 320,000 สิ — หลักพัน ร้อย สิบ หน่วย เป็น 0 หมด เราข้ามไม่ต้องอ่าน → "สามแสนสองหมื่น"',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 320000, readOnly: true },
      },
    },
    {
      id: 'make-320000',
      say: 'ลองสร้าง 320,000 ดู — สามแสนสองหมื่น',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 0 },
      },
      goal: { type: 'reach-value', key: 'value', value: 320000 },
      hint: 'หลักแสน = 3, หลักหมื่น = 2, ที่เหลือ 0',
    },
    {
      id: 'special',
      say: 'เลขท้ายมีกฎพิเศษ: ถ้ามีหลักอื่นนำหน้าแล้วลงท้ายด้วย 1 อ่านว่า "เอ็ด" (เช่น 21 = ยี่สิบเอ็ด) แต่ถ้าเป็น 1 ตัวเดียวอ่านว่า "หนึ่ง" · หลักสิบที่เป็น 2 อ่านว่า "ยี่สิบ"',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 21, readOnly: true },
      },
    },
    {
      id: 'quiz-read',
      say: 'ลองอ่านดู! จำนวน 452,000 อ่านว่าอะไร?',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 452000, readOnly: true },
      },
      goal: {
        type: 'answer',
        question: {
          type: 'mc',
          q: '452,000 อ่านว่าอะไร?',
          opts: ['สี่แสนห้าหมื่นสองพัน', 'สี่หมื่นห้าพันสองร้อย', 'สี่ล้านห้าแสนสองหมื่น', 'สี่แสนห้าพันสอง'],
          ans: 0,
          hint: 'อ่านทีละหลักจากซ้าย: แสน=4, หมื่น=5, พัน=2',
        },
      },
    },
    {
      id: 'recap',
      say: 'สรุปเก็บกลับบ้าน 🏠 อ่านเลขใหญ่ทีละหลักจากซ้ายไปขวา · หลักไหนเป็น 0 ข้ามไป · ลงท้าย 1 = เอ็ด แค่นี้อ่านได้ทุกจำนวน!',
      visual: {
        component: 'ThaiNumberBuilder',
        config: { initialValue: 250000, readOnly: true },
      },
    },
  ],
  finalPractice: [
    { type: 'mc', q: '250,000 อ่านว่าอะไร?', opts: ['สองหมื่นห้าพัน', 'สองแสนห้าหมื่น', 'สองล้านห้าแสน', 'ยี่สิบห้าพัน'], ans: 1, hint: 'หลักแสน = 2, หลักหมื่น = 5' },
    { type: 'fill', q: 'เขียนตัวเลข "สามแสนสองหมื่น" = ___', ans: '320000', hint: 'หลักแสน 3 หลักหมื่น 2 ที่เหลือ 0' },
    { type: 'mc', q: 'เลข 7 ใน 472,000 อยู่หลักอะไร?', opts: ['พัน', 'หมื่น', 'แสน', 'ล้าน'], ans: 1, hint: 'นับจากขวา: หน่วย สิบ ร้อย พัน หมื่น — 7 อยู่หลักหมื่น' },
    { type: 'fill', q: 'เขียนตัวเลข "หนึ่งแสน" = ___', ans: '100000', hint: 'หลักแสน = 1 ที่เหลือ 0 ทั้งหมด 6 หลัก' },
    { type: 'mc', q: '500,000 อ่านว่าอะไร?', opts: ['ห้าหมื่น', 'ห้าพัน', 'ห้าแสน', 'ห้าล้าน'], ans: 2, hint: 'หลักแสน = 5 ที่เหลือ 0' },
    { type: 'fill', q: 'เลข 6 ใน 634,000 มีค่าเท่าไร? ___', ans: '600000', hint: 'เลข 6 อยู่หลักแสน = 6 × 100,000' },
    { type: 'mc', q: 'จำนวนใดมากที่สุด?', opts: ['99,999', '100,000', '90,909', '98,888'], ans: 1, hint: 'จำนวนที่มี 6 หลักมากกว่าจำนวน 5 หลัก' },
    { type: 'slider', q: 'ลากให้ได้จำนวน "สามแสน"', min: 0, max: 600000, step: 100000, ans: 300000, unit: '', hint: 'สามแสน = 3 × 100,000' },
    { type: 'fill', q: 'จำนวนนับที่มากที่สุดซึ่งมี 6 หลัก คือ ___', ans: '999999', hint: 'ทุกหลักเป็น 9 หมด' },
    { type: 'mc', q: '405,000 อ่านว่าอะไร?', opts: ['สี่แสนห้าพัน', 'สี่แสนห้าหมื่น', 'สี่หมื่นห้าพัน', 'สี่แสนห้าร้อย'], ans: 0, hint: 'หลักหมื่นเป็น 0 ข้ามไป — แสน 4, พัน 5' },
  ],
}

export default numbers
