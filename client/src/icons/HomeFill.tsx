export default function HomeFillIcon({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='currentColor'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 13.25V28a1 1 0 0 0 1 1h6v-8.5a1.5 1.5 0 0 1 1.5-1.5h5a1.5 1.5 0 0 1 1.5 1.5V29h6a1 1 0 0 0 1-1V13.25'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5 12.25a1 1 0 0 1 1 1V28h5v-7.5a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 2.5 2.5V28h5V13.25a1 1 0 1 1 2 0V28a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-8.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V29a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2V13.25a1 1 0 0 1 1-1Z'
      />
      <path
        d='M30 16 16.68 3.25c-.312-.33-1.043-.334-1.36 0L2 16m23-4.813V4h-3v4.313'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.386 2.54 21 6V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6.787l4.692 4.49a1 1 0 1 1-1.384 1.445L16.02 4.002a.232.232 0 0 0-.04 0L2.691 16.722a1 1 0 1 1-1.382-1.444L14.614 2.54c.408-.414.964-.54 1.389-.539.423 0 .977.128 1.382.54ZM24 8.873V5h-1v2.915l1 .957Z'
      />
    </svg>
  )
}
