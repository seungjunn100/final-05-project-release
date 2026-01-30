interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionCard({ title, children, className = '' }: SectionCardProps) {
  return (
    <section className={`p-10 bg-yg-white shadow-lg rounded-[50px] ${className}`}>
      <h1 className="text-xl font-bold">{title}</h1>
      <br />
      {children}
    </section>
  );
}
