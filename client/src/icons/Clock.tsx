export default function ClockIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3 16C3 8.823 8.823 3 16 3s13 5.823 13 13-5.823 13-13 13S3 23.177 3 16ZM16 5C9.927 5 5 9.927 5 16s4.927 11 11 11 11-4.927 11-11S22.073 5 16 5Z'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16 7a1 1 0 0 1 1 1v8h5a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z'
      />
    </svg>
  )
}
