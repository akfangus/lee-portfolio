import React, { memo, type SVGProps } from "react"

export const SiotIcon = memo(function SiotIcon({
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
      className={`text-green-500 ${className || ""}`}
      {...props}
    >
      <path
        d="M12 4L4 20M12 4L20 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
})
