/**
 * 카테고리별 일러스트 아이콘 SVG 컴포넌트
 */
export function CategoryIllustration({
  category,
}: {
  category: "Skill" | "Trouble Shooting" | "Issue"
}): React.ReactElement {
  if (category === "Skill") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
        {/* 코드 아이콘 */}
        <svg
          className="h-16 w-16 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        {/* 배경 장식 */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/5" />
      </div>
    )
  }

  if (category === "Issue") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-400 via-purple-500 to-pink-600">
        {/* 이슈 아이콘 */}
        <svg
          className="h-16 w-16 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        {/* 배경 장식 */}
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />
      </div>
    )
  }

  // Trouble Shooting
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-500 to-rose-600">
      {/* 버그 아이콘 */}
      <svg
        className="h-16 w-16 text-white/80"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
      {/* 배경 장식 */}
      <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-white/5" />
    </div>
  )
}
