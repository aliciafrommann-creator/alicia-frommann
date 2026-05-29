export function downloadCalendarEvent({
  title,
  description,
  minutesFromNow = 60,
  durationMinutes = 45,
  filename = 'participation-os-event.ics',
}: {
  title: string
  description: string
  minutesFromNow?: number
  durationMinutes?: number
  filename?: string
}) {
  if (typeof window === 'undefined') return
  const start = new Date(Date.now() + minutesFromNow * 60 * 1000)
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000)
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Participation OS Demo//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@participation-os.demo`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export async function copyInvite(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }
  return false
}
