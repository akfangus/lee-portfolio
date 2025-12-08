import React, { memo, type SVGProps } from "react"

export const HieutIcon = memo(function HieutIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-orange-500 ${className || ""}`}
      {...props}
    >
      <path
        d="M10 5H14M6 9H18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="16" r="5" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
})
