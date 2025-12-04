/**
 * 블로그 섹션 로딩 스켈레톤
 */
export function BlogSkeleton(): React.ReactElement {
  return (
    <section
      id="blog"
      className="flex h-[600px] w-full items-center justify-center"
    >
      <div className="animate-pulse text-stone-400">Loading blog...</div>
    </section>
  )
}
