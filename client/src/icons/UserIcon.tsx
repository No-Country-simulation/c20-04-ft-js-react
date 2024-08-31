import { SVGProps } from 'react';

export default function UserIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.5 9c-.245 3.304-2.75 6-5.5 6s-5.26-2.695-5.5-6c-.25-3.438 2.188-6 5.5-6 3.313 0 5.75 2.625 5.5 6Z'
        stroke='#000'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16 19c-5.438 0-10.956 3-11.977 8.663C3.899 28.345 4.286 29 5 29h22c.715 0 1.101-.655.978-1.337C26.956 22 21.438 19 16 19Z'
        stroke='#000'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
    </svg>
  );
}
