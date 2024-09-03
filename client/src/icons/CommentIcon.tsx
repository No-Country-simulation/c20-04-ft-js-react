import { SVGProps } from "react";

export default function CommentIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props}
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'><path d="M3.658 23.346c.08-.295-.097-.705-.266-1a3.022 3.022 0 0 0-.17-.256A13.449 13.449 0 0 1 1 14.686C.977 7.131 7.241 1 14.99 1c6.756 0 12.396 4.68 13.713 10.894.198.92.298 1.86.298 2.802 0 7.566-6.023 13.794-13.77 13.794-1.232 0-2.895-.31-3.801-.564a25.49 25.49 0 0 1-2.046-.68 2.091 2.091 0 0 0-1.562.024l-4.565 1.648c-.1.043-.206.07-.315.082a.647.647 0 0 1-.644-.656c.006-.075.02-.149.04-.221l1.321-4.777Z" stroke-miterlimit="10" stroke-linecap="round" /></svg>)
}