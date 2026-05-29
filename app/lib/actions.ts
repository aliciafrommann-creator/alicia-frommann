'use client'

import { toast } from '../components/toast'

// Open a prefilled Google Calendar event in a new tab, starting ~90 min from now.
export function addToCalendar(title: string, body = '') {
  const start = new Date(Date.now() + 90 * 60 * 1000)
  const end = new Date(start.getTime() + 30 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const url =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(title)}` +
    `&details=${encodeURIComponent(body || 'Participation OS mission')}` +
    `&dates=${fmt(start)}/${fmt(end)}`
  window.open(url, '_blank', 'noopener,noreferrer')
  toast('Opening calendar…')
}

// Share via Web Share API if available, else copy to clipboard with feedback.
export async function inviteFriend(title: string) {
  const text = `Join my mission: ${title}`
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Join my mission', text })
      return
    } catch {
      // user cancelled or share failed — fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    toast('Invite copied to clipboard', 'success')
  } catch {
    toast('Could not copy invite')
  }
}
