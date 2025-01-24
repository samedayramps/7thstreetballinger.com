import { sanityFetch } from '@/sanity/lib/live'
import { regularServicesQuery, upcomingEventsQuery } from '@/lib/queries'
import { formatTime, formatDate } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { RegularService, Event } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarButtons } from '@/components/calendar-buttons'

async function getRegularServices() {
  const response = await sanityFetch({ query: regularServicesQuery })
  return response.data as RegularService[]
}

async function getUpcomingEvents() {
  const today = new Date().toISOString().split('T')[0]
  const response = await sanityFetch({ 
    query: upcomingEventsQuery,
    params: { today }
  })
  return response.data as Event[]
}

export default async function Home() {
  const [services, events] = await Promise.all([
    getRegularServices(),
    getUpcomingEvents()
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Seventh Street Baptist Church
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Join us in worship and fellowship
          </p>
        </div>
      </section>

      {/* Regular Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Regular Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: RegularService) => (
              <div 
                key={service._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-2">{service.dayOfWeek} at {formatTime(service.time)}</p>
                <p className="text-gray-600 mb-2">{service.location}</p>
                {service.description && (
                  <p className="text-gray-500 text-sm">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link 
              href="/events"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              See All Events
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: Event) => (
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
                  <p className="text-gray-500 text-sm mb-4">
                    {event.description[0]?.children?.[0]?.text || ''}
                  </p>
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
          </div>
        </div>
      </section>
    </div>
  )
}
