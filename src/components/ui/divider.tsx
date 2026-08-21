import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

export default function Divider({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('my-5 flex items-center gap-4', className)}>
      {children ? <h2 className="shrink-0 font-semibold text-[#475467] text-lg dark:text-[#f3f4f6]">{children}</h2> : null}
      <span className="h-px grow bg-[#e1e5ec] dark:bg-white/10" />
    </div>
  );
}
