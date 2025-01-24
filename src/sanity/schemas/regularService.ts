import { ValidationRule } from './types'

export const regularService = {
  name: 'regularService',
  title: 'Regular Services',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
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
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'time',
      title: 'Service Time',
      type: 'object',
      fields: [
        {
          name: 'hour',
          title: 'Hour',
          type: 'number',
          options: {
            list: Array.from({ length: 12 }, (_, i) => i + 1),
          },
          validation: (Rule: ValidationRule) => Rule.required(),
        },
        {
          name: 'minute',
          title: 'Minute',
          type: 'number',
          options: {
            list: [0, 15, 30, 45],
          },
          validation: (Rule: ValidationRule) => Rule.required(),
        },
        {
          name: 'period',
          title: 'AM/PM',
          type: 'string',
          options: {
            list: ['AM', 'PM'],
          },
          validation: (Rule: ValidationRule) => Rule.required(),
        },
      ],
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
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
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: ValidationRule) => Rule.required().min(0),
    },
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
    prepare({ title, dayOfWeek, hour, minute, period, locationName }: { 
      title?: string; 
      dayOfWeek?: string; 
      hour?: number; 
      minute?: number; 
      period?: string;
      locationName?: string;
    }) {
      const formattedTime = hour && minute && period 
        ? `${hour}:${minute.toString().padStart(2, '0')} ${period}`
        : 'Time not set';

      return {
        title: title || 'Untitled Service',
        subtitle: `${dayOfWeek || 'Day not set'} at ${formattedTime}${locationName ? ` - ${locationName}` : ''}`,
      };
    },
  },
} 