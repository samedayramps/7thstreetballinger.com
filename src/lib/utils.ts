type Time = {
  hour: number
  minute: number
  period: string
}

export function formatTime(time: Time): string {
  return `${time.hour}:${time.minute.toString().padStart(2, '0')} ${time.period}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

function convertTo24Hour(time: Time): { hour: number; minute: number } {
  let hour = time.hour
  if (time.period === 'PM' && hour !== 12) {
    hour += 12
  } else if (time.period === 'AM' && hour === 12) {
    hour = 0
  }
  return { hour, minute: time.minute }
}

function formatDateTimeForCalendar(date: string, time: Time): { start: Date; end: Date } {
  const { hour, minute } = convertTo24Hour(time)
  const startDate = new Date(date)
  startDate.setHours(hour, minute, 0, 0)
  
  // Default event duration is 1 hour
  const endDate = new Date(startDate)
  endDate.setHours(startDate.getHours() + 1)
  
  return { start: startDate, end: endDate }
}

export function generateCalendarUrls(title: string, description: string | undefined, location: string, date: string, time: Time) {
  const { start, end } = formatDateTimeForCalendar(date, time)
  
  // Format dates for Google Calendar
  const startTime = start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const endTime = end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  
  // Google Calendar URL
  const googleUrl = new URL('https://calendar.google.com/calendar/render')
  googleUrl.searchParams.append('action', 'TEMPLATE')
  googleUrl.searchParams.append('text', title)
  if (description) {
    googleUrl.searchParams.append('details', description)
  }
  googleUrl.searchParams.append('location', location)
  googleUrl.searchParams.append('dates', `${startTime}/${endTime}`)

  // Apple Calendar URL (ics format)
  const iCalUrl = new URL('data:text/calendar;charset=utf8,')
  const icalContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${startTime}`,
    `DTEND:${endTime}`,
    `SUMMARY:${title}`,
    description ? `DESCRIPTION:${description.replace(/\n/g, '\\n')}` : '',
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\n')
  
  iCalUrl.searchParams.append('', encodeURIComponent(icalContent))

  return {
    google: googleUrl.toString(),
    apple: iCalUrl.toString()
  }
} 