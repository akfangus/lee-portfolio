"use client"

import { useInView } from "react-intersection-observer"

interface BlogSectionProps {
  children: React.ReactNode
}

export function BlogSection({
  children,
}: BlogSectionProps): React.ReactElement {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      id="blog"
      className={`w-full py-24 ${inView ? "animate-fade-in-up" : "opacity-0"}`}
    >
      {children}
    </section>
  )
}
