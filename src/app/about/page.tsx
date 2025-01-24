import { sanityFetch } from '@/sanity/lib/live'
import { allStaffQuery, allMinistriesQuery } from '@/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { StaffMember, Ministry } from '@/lib/types'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

async function getStaffAndMinistries() {
  const [staffResponse, ministriesResponse] = await Promise.all([
    sanityFetch({ query: allStaffQuery }),
    sanityFetch({ query: allMinistriesQuery })
  ])
  return {
    staff: staffResponse.data as StaffMember[],
    ministries: ministriesResponse.data as Ministry[]
  }
}

export default async function AboutPage() {
  const { staff, ministries } = await getStaffAndMinistries()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Our Church</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Seventh Street Baptist Church has been serving the Ballinger community since 1886, 
            sharing God&apos;s love and making disciples through worship, fellowship, and service.
          </p>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-8">
                To share the love of Christ with all people, make disciples through Biblical teaching, 
                and serve our community with compassion and grace.
              </p>
              <h3 className="text-2xl font-bold mb-4">Core Values</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Biblical Teaching & Preaching</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Worship & Prayer</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Community & Fellowship</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Service & Outreach</span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/church-building.jpg"
                alt="Seventh Street Baptist Church Building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <div 
                key={member._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="aspect-square relative mb-4 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(member.profileImage).width(400).height(400).url()}
                    alt={`${member.firstName} ${member.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  {member.biography && (
                    <div className="text-gray-600 text-sm mb-4 prose-sm max-w-none">
                      <PortableText value={member.biography} />
                    </div>
                  )}
                  <div className="space-y-1 text-sm text-gray-500">
                    {member.email && (
                      <p>
                        <a 
                          href={`mailto:${member.email}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {member.email}
                        </a>
                      </p>
                    )}
                    {member.phone && (
                      <p>
                        <a 
                          href={`tel:${member.phone}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {member.phone}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Ministries</h2>
          <div className="grid gap-8">
            {ministries.map((ministry) => (
              <div 
                key={ministry._id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="grid md:grid-cols-[2fr_3fr] gap-8">
                  {ministry.featuredImage && (
                    <div className="aspect-video relative rounded-md overflow-hidden">
                      <Image
                        src={urlFor(ministry.featuredImage).width(600).height(400).url()}
                        alt={ministry.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">{ministry.name}</h3>
                    {ministry.description && (
                      <div className="text-gray-600 mb-6 prose-sm max-w-none">
                        <PortableText value={ministry.description} />
                      </div>
                    )}
                    <div className="space-y-4">
                      {ministry.leader && (
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">Ministry Leader</p>
                          <p className="text-gray-600">
                            {ministry.leader.firstName} {ministry.leader.lastName}
                            {ministry.leader.role && (
                              <span className="text-gray-500"> - {ministry.leader.role}</span>
                            )}
                          </p>
                          {ministry.leader.email && (
                            <p>
                              <a 
                                href={`mailto:${ministry.leader.email}`}
                                className="text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                {ministry.leader.email}
                              </a>
                            </p>
                          )}
                        </div>
                      )}
                      {(ministry.contactEmail || ministry.contactPhone) && (
                        <div className="text-sm">
                          <p className="font-semibold text-gray-900">Contact Information</p>
                          {ministry.contactEmail && (
                            <p>
                              <a 
                                href={`mailto:${ministry.contactEmail}`}
                                className="text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                {ministry.contactEmail}
                              </a>
                            </p>
                          )}
                          {ministry.contactPhone && (
                            <p>
                              <a 
                                href={`tel:${ministry.contactPhone}`}
                                className="text-blue-600 hover:text-blue-700 transition-colors"
                              >
                                {ministry.contactPhone}
                              </a>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 