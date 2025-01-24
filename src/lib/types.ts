import { PortableTextBlock } from '@portabletext/types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type Time = {
  hour: number
  minute: number
  period: string
}

export type RegularService = {
  _id: string
  name: string
  dayOfWeek: string
  time: Time
  description?: string
  location: string
  serviceType: string
}

export type Event = {
  _id: string
  title: string
  date: string
  time: Time
  description?: PortableTextBlock[]
  location: string
  featuredImage?: SanityImageSource
  registrationRequired: boolean
  registrationLink?: string
}

export type StaffMember = {
  _id: string
  firstName: string
  lastName: string
  role: string
  showOnWebsite: boolean
  biography?: PortableTextBlock[]
  email?: string
  phone?: string
  profileImage: SanityImageSource
}

export type Ministry = {
  _id: string
  name: string
  description?: PortableTextBlock[]
  featuredImage?: SanityImageSource
  contactEmail?: string
  contactPhone?: string
  leader?: {
    firstName: string
    lastName: string
    role: string
    email?: string
    phone?: string
  }
} 