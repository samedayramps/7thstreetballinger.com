import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'showOnWebsite',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Toggle to control whether this event appears on the public website',
      initialValue: true,
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Event Time',
      type: 'object',
      fields: [
        defineField({
          name: 'hour',
          title: 'Hour',
          type: 'number',
          options: {
            list: Array.from({ length: 12 }, (_, i) => i + 1),
          },
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'minute',
          title: 'Minute',
          type: 'number',
          options: {
            list: [0, 15, 30, 45],
          },
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'period',
          title: 'AM/PM',
          type: 'string',
          options: {
            list: ['AM', 'PM'],
          },
          validation: rule => rule.required(),
        }),
      ],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      hidden: ({ document }) => !document?.registrationRequired,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      hour: 'time.hour',
      minute: 'time.minute',
      period: 'time.period',
      locationName: 'location.name',
      media: 'featuredImage',
      showOnWebsite: 'showOnWebsite',
    },
    prepare(selection) {
      const {title, date, hour, minute, period, locationName, media, showOnWebsite} = selection
      const formattedTime = hour && minute && period 
        ? `${hour}:${minute.toString().padStart(2, '0')} ${period}`
        : 'Time not set'
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Date not set'
      const visibility = showOnWebsite ? '' : ' [Hidden]'

      return {
        title: `${title || 'Untitled Event'}${visibility}`,
        subtitle: `${formattedDate} at ${formattedTime}${locationName ? ` - ${locationName}` : ''}`,
        media,
      }
    },
  },
}) 