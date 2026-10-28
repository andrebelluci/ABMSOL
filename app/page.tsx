import { Concepts } from '@/components/sections/Concepts'
import { FinalCta } from '@/components/sections/FinalCta'
import { Hero } from '@/components/sections/Hero'
import { Plan } from '@/components/sections/Plan'
import { Process } from '@/components/sections/Process'
import { Services } from '@/components/sections/Services'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Concepts />
      <Process />
      <Plan />
      <FinalCta />
    </main>
  )
}
