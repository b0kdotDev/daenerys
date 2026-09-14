'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export function MilestoneCard({
  from,
  children,
}: {
  from: 'left' | 'right';
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.22 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`milestone-card ${from === 'right' ? 'from-right' : 'from-left'}${on ? ' is-in' : ''} border border-[#f4c4d4] bg-[#fff8fb] p-4 shadow-[0_8px_28px_rgba(224,122,154,0.12)] sm:p-5`}
    >
      {children}
    </article>
  );
}
