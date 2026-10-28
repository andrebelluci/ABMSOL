type ProcessNodeProps = {
  index: string
  title: string
}

export function ProcessNode({ index, title }: ProcessNodeProps) {
  return (
    <span
      className="process-node"
      data-cursor="node"
      data-cursor-label={title}
      data-cursor-theme="dark"
      aria-hidden="true"
    >
      <span className="process-node-on" />
      <span className="process-node-index">{index}</span>
    </span>
  )
}
