import { HOME_TRAIL } from '@/lib/home-trail'

export function PageTrail() {
  return (
    <div className="page-trail" data-page-trail aria-hidden="true">
      <span className="page-trail-line" />
      <span className="page-trail-progress" />
      {HOME_TRAIL.map((item) => (
        <span
          key={item.id}
          className="page-trail-stop"
          data-trail-stop={item.id}
          style={{ top: item.top }}
        >
          <span className="page-trail-stop-on" />
        </span>
      ))}
    </div>
  )
}
