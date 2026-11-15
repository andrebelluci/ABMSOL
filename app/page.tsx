import { MarkField } from '@/components/brand/MarkField'
import { BehindTeaser } from '@/components/sections/BehindTeaser'
import { Concepts } from '@/components/sections/Concepts'
import { SectionPass } from '@/components/sections/SectionPass'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { Plan } from '@/components/sections/Plan'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarkField />
      <SectionPass />
      <Services />
      <Concepts />
      <Process />
      <Plan />
      <BehindTeaser />
      <FinalCta />
    </main>
  )
}
