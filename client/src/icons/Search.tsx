export default function SearchIcon({
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.808 4.823a10.819 10.819 0 0 1 16.828 8.995A10.819 10.819 0 1 1 7.808 4.823Zm6.01.177a8.818 8.818 0 1 0 8.818 8.818M13.818 5a8.819 8.819 0 0 1 8.818 8.818'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.436 20.436a1 1 0 0 1 1.414 0l6.857 6.857a1 1 0 1 1-1.414 1.414l-6.857-6.857a1 1 0 0 1 0-1.414Z'
      />
    </svg>
  )
}
