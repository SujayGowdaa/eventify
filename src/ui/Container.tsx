import type { ReactNode } from 'react';

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} max-w-[1800px] mx-auto px-8 py-16`}>
      {children}
    </div>
  );
}
