import { MarkField } from '@/components/brand/MarkField'
import { BehindTeaser } from '@/components/sections/BehindTeaser'
import { Concepts } from '@/components/sections/Concepts'
import { SectionPass } from '@/components/sections/SectionPass'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { Plan } from '@/components/sections/Plan'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'
import { Visibility } from '@/components/sections/Visibility'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MarkField />
      <SectionPass />
      <Visibility />
      <Services />
      <Concepts />
      <Process />
      <Plan />
      <BehindTeaser />
      <FinalCta />
    </main>
  )
}
