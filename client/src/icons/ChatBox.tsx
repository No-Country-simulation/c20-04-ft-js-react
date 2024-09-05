export default function ChatBoxIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M25.5 4h-19A3.51 3.51 0 0 0 3 7.5v12A3.51 3.51 0 0 0 6.5 23H9v5l5.857-4.884a.5.5 0 0 1 .321-.116H25.5a3.51 3.51 0 0 0 3.5-3.5v-12A3.51 3.51 0 0 0 25.5 4Z'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  )
}
