import ReactMarkdown from 'react-markdown'

export function BlogMarkdown({ body }: { body: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              data-cursor="link"
              data-cursor-theme="dark"
            >
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  )
}
