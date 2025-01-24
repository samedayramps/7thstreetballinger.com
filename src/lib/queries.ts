import { groq } from 'next-sanity'

export const regularServicesQuery = groq`
  *[_type == "regularService"] | order(order asc) {
    _id,
    name,
    dayOfWeek,
    time,
    description,
    serviceType,
    "location": location->name
  }
`

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= $today && showOnWebsite == true] | order(date asc) [0...3] {
    _id,
    title,
    date,
    time,
    description,
    "location": location->name,
    featuredImage,
    registrationRequired,
    registrationLink
  }
`

export const allEventsQuery = groq`
  *[_type == "event" && showOnWebsite == true] | order(date asc) {
    _id,
    title,
    date,
    time,
    description,
    "location": location->name,
    featuredImage,
    registrationRequired,
    registrationLink
  }
`

export const allStaffQuery = groq`
  *[_type == "staff" && showOnWebsite == true] | order(order asc) {
    _id,
    firstName,
    lastName,
    role,
    biography,
    email,
    phone,
    profileImage
  }
`

export const allMinistriesQuery = groq`
  *[_type == "ministry"] {
    _id,
    name,
    description,
    featuredImage,
    contactEmail,
    contactPhone,
    "leader": leader->{
      firstName,
      lastName,
      role,
      email,
      phone
    }
  }
` 