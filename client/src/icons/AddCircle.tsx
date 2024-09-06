export default function AddCircleIcon({
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
        d='M28 16c0-6.625-5.375-12-12-12S4 9.375 4 16s5.375 12 12 12 12-5.375 12-12Z'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
      <path
        d='M16 11v10m5-5H11'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
