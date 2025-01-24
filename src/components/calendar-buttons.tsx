import { Time } from '@/lib/types'
import { generateCalendarUrls } from '@/lib/utils'

interface CalendarButtonsProps {
  title: string
  description?: string
  location: string
  date: string
  time: Time
}

export function CalendarButtons({ title, description, location, date, time }: CalendarButtonsProps) {
  const { google, apple } = generateCalendarUrls(title, description, location, date, time)

  return (
    <div className="flex gap-2">
      <a
        href={google}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.56 10.25l-9.56-7.56-9.56 7.56L4 11.81l8-6.32 8 6.32zm-9.56 1.75c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
        Google Calendar
      </a>
      <a
        href={apple}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900 transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z"/>
          <path d="M7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
        </svg>
        Apple Calendar
      </a>
    </div>
  )
} 