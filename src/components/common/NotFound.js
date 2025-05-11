'use client';

import Link from 'next/link';

export default function NotFound({ title, href }) {
  return (
    <div className="flex size-full flex-1 flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="text-7xl font-bold">404</div>
        <div className="ml-3 flex flex-col border-l border-l-black pl-3">
          <div>{`There's no page at this address`}</div>
          <div className="text-[12px]">Check the URL and try again</div>
          <Link className="mt-3 self-center rounded-[4px] bg-primary px-4 py-1 text-white" href={href}>
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
}
