import { sanityFetch } from '@/sanity/lib/live'
import { allEventsQuery } from '@/lib/queries'
import { formatTime, formatDate } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { Event } from '@/lib/types'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { CalendarButtons } from '@/components/calendar-buttons'

async function getAllEvents() {
  const response = await sanityFetch({ query: allEventsQuery })
  return response.data as Event[]
}

export default async function EventsPage() {
  const events = await getAllEvents()
  const today = new Date().toISOString().split('T')[0]

  // Separate events into upcoming and past
  const { upcoming, past } = events.reduce(
    (acc, event) => {
      if (event.date >= today) {
        acc.upcoming.push(event)
      } else {
        acc.past.push(event)
      }
      return acc
    },
    { upcoming: [] as Event[], past: [] as Event[] }
  )

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Church Events</h1>

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((event) => (
              <div 
                key={event._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                {event.featuredImage && (
                  <div className="aspect-video relative mb-4 rounded-md overflow-hidden">
                    <Image
                      src={urlFor(event.featuredImage).url()}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
                <p className="text-gray-600 mb-2">{formatTime(event.time)}</p>
                <p className="text-gray-600 mb-2">{event.location}</p>
                {event.description && (
                  <div className="text-gray-500 text-sm mb-4 prose-sm">
                    <PortableText value={event.description} />
                  </div>
                )}
                <div className="space-y-4">
                  {event.registrationRequired && event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                    >
                      Register Now
                    </a>
                  )}
                  <CalendarButtons
                    title={event.title}
                    description={event.description?.[0]?.children?.[0]?.text}
                    location={event.location}
                    date={event.date}
                    time={event.time}
                  />
                </div>
              </div>
            ))}
            {upcoming.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">
                No upcoming events scheduled at this time.
              </p>
            )}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Past Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.map((event) => (
              <div 
                key={event._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 opacity-75"
              >
                {event.featuredImage && (
                  <div className="aspect-video relative mb-4 rounded-md overflow-hidden grayscale">
                    <Image
                      src={urlFor(event.featuredImage).url()}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{formatDate(event.date)}</p>
                <p className="text-gray-600 mb-2">{formatTime(event.time)}</p>
                <p className="text-gray-600 mb-2">{event.location}</p>
                {event.description && (
                  <div className="text-gray-500 text-sm mb-4 prose-sm">
                    <PortableText value={event.description} />
                  </div>
                )}
              </div>
            ))}
            {past.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-8">
                No past events to show.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
} 