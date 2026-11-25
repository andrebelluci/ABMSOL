import Image from 'next/image'

import type { blogAuthors } from '@/lib/content/blog/authors'

type Author = (typeof blogAuthors)[keyof typeof blogAuthors]

export function BlogAuthorCard({ author }: { author: Author }) {
  return (
    <aside className="blog-author" aria-label="Autor">
      <Image
        src={author.photo}
        alt={author.photoAlt}
        width={72}
        height={72}
        className="blog-author-photo"
      />
      <div>
        <p className="font-display text-lead font-semibold text-ink">{author.name}</p>
        <p className="is-muted mt-1 text-body">{author.role}</p>
        <p className="is-muted mt-2 text-body" data-cursor-avoid="">
          {author.bio}
        </p>
      </div>
    </aside>
  )
}
