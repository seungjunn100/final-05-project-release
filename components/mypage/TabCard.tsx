import { ReactNode } from 'react';

interface TabCardProps {
  children: ReactNode;
  className?: string;
}

export default function TabCard({ children, className = '' }: TabCardProps) {
  return (
    <section className={`p-10 shadow-lg rounded-[50px] bg-yg-white ${className}`}>
      {children}
    </section>
  );
}
