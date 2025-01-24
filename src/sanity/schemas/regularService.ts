import { defineType, defineField } from 'sanity'

export const regularService = defineType({
  name: 'regularService',
  title: 'Regular Services',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Service Time',
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
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          'Main Service',
          'Youth Service',
          'Children\'s Service',
          'Prayer Meeting',
          'Bible Study',
          'Other',
        ],
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: rule => rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      dayOfWeek: 'dayOfWeek',
      hour: 'time.hour',
      minute: 'time.minute',
      period: 'time.period',
      locationName: 'location.name',
    },
    prepare(selection) {
      const {title, dayOfWeek, hour, minute, period, locationName} = selection
      const formattedTime = hour && minute && period 
        ? `${hour}:${minute.toString().padStart(2, '0')} ${period}`
        : 'Time not set'

      return {
        title: title || 'Untitled Service',
        subtitle: `${dayOfWeek || 'Day not set'} at ${formattedTime}${locationName ? ` - ${locationName}` : ''}`,
      }
    },
  },
}) 