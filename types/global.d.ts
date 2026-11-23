declare module '*.css'

interface AgencyOsWidgetApi {
  open: () => void
  close: () => void
  toggle: () => void
  destroy?: () => void
  recalculateOffset?: () => void
  getLauncherBottom?: () => number
}

interface Window {
  AgencyOSWidget?: AgencyOsWidgetApi
}
