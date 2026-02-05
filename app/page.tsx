import SectionHero from '@/components/common/SectionHero';
import SectionFeatures from '@/components/common/SectionFeatures';
import SectionCTA from '@/components/common/SectionCTA';
import SectionDirections from '@/components/common/SectionDirections';

export default function Home() {
  return (
    <main>
      <SectionHero />
      <SectionFeatures />
      <SectionDirections />
      <SectionCTA />
    </main>
  );
}
