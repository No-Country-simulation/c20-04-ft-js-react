export default function MailIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
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
        d='M26.5 6h-21A2.5 2.5 0 0 0 3 8.5v15A2.5 2.5 0 0 0 5.5 26h21a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 26.5 6Z'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='m7 10 9 7 9-7'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
