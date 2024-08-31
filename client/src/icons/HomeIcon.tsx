import { SVGProps } from "react";

export default function HomeIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5 13.25V28a1 1 0 0 0 1 1h6v-8.5a1.5 1.5 0 0 1 1.5-1.5h5a1.5 1.5 0 0 1 1.5 1.5V29h6a1 1 0 0 0 1-1V13.25'
        stroke='#000'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M30 16 16.68 3.25c-.312-.33-1.043-.334-1.36 0L2 16m23-4.813V4h-3v4.313'
        stroke='#000'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
