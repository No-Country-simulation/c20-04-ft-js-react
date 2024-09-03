import { SVGProps } from 'react'

export default function CommentIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.645 17.813c.056-.206-.067-.491-.185-.697a2.108 2.108 0 0 0-.119-.178 9.366 9.366 0 0 1-1.547-5.156C2.778 6.52 7.141 2.25 12.536 2.25c4.706 0 8.633 3.26 9.551 7.587.138.641.207 1.296.207 1.952 0 5.269-4.195 9.606-9.59 9.606-.858 0-2.016-.216-2.647-.393a17.713 17.713 0 0 1-1.424-.474 1.458 1.458 0 0 0-1.088.017l-3.18 1.148a.751.751 0 0 1-.219.057.45.45 0 0 1-.448-.457.744.744 0 0 1 .028-.154l.92-3.326Z'
        strokeMiterlimit='10'
        strokeLinecap='round'
      />
    </svg>
  )
}
