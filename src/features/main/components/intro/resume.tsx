"use client"

import { EyeIcon } from "lucide-react"

const RESUME_URL =
  "https://fqne1e1vih055r1l.public.blob.vercel-storage.com/%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B5%E1%86%AB%E1%84%92%E1%85%A2%E1%86%BC_2026_%E1%84%8B%E1%85%B5%E1%84%85%E1%85%A7%E1%86%A8%E1%84%89%E1%85%A5.pdf"
const RESUME_FILENAME = "이신행_2026_이력서.pdf"

export function Resume() {
  return (
    <a
      href={RESUME_URL}
      download={RESUME_FILENAME}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-stone-200 text-stone-700 px-4 py-2 rounded-md hover:bg-stone-300 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
    >
      이력서 보기
      <EyeIcon className="w-4 h-4" />
    </a>
  )
}
