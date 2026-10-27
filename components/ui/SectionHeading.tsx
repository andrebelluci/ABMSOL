import { Label } from '@/components/ui/Label'

type SectionHeadingProps = {
  index: string
  label: string
  title: string
  children?: React.ReactNode
}

export function SectionHeading({
  index,
  label,
  title,
  children,
}: SectionHeadingProps) {
  return (
    <header className="max-w-3xl">
      <Label>
        {index} {label}
      </Label>
      <h2 className="mt-3 text-balance text-h2">{title}</h2>
      {children ? (
        <p className="is-muted mt-4 text-lead">{children}</p>
      ) : null}
    </header>
  )
}
