'use client';

import { usePathname } from 'next/navigation';
import HeaderInner from './HeaderInner';

export default function Header() {
  const pathname = usePathname();

  return <HeaderInner key={pathname} />;
}
