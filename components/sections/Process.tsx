import { MarkRay } from '@/components/brand/MarkRay'
import { ProcessMotion } from '@/components/sections/ProcessMotion'
import { Reveal } from '@/components/sections/Reveal'
import { ProcessNode } from '@/components/sections/ProcessNode'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSection, processSteps } from '@/lib/content/process'

export function Process() {
  return (
    <section
      id="como-trabalhamos"
      className="home-section home-anchor bg-navy-800"
      data-cursor-theme="dark"
    >
      <MarkRay place="section" />
      <div className="mx-auto w-full max-w-page py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide">
        <Reveal>
        <div data-reveal data-cursor-avoid="">
          <SectionHeading
            index={processSection.index}
            label={processSection.label}
            title={processSection.title}
          >
            {processSection.lead}
          </SectionHeading>
        </div>
        <ol className="process-list">
          {processSteps.map((step) => (
            <li key={step.index} className="process-step" data-process-step>
              <ProcessNode index={step.index} title={step.title} />
              <div data-reveal data-cursor-avoid="">
                <h3 className="font-display text-lead font-semibold">{step.title}</h3>
                <p className="is-muted mt-2 max-w-xl text-body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        </Reveal>
      </div>
      <ProcessMotion />
    </section>
  )
}
