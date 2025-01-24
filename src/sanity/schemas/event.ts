import { ValidationRule } from './types'
import { ImageValue } from '@sanity/types'

export const event = {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'showOnWebsite',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Toggle to control whether this event appears on the public website',
      initialValue: true,
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'time',
      title: 'Event Time',
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
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{ type: 'location' }],
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      hidden: ({ document }: { document: { registrationRequired?: boolean } }) => !document?.registrationRequired,
    },
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
    prepare({ title, date, hour, minute, period, locationName, media, showOnWebsite }: { 
      title?: string; 
      date?: string; 
      hour?: number; 
      minute?: number; 
      period?: string;
      locationName?: string;
      media?: ImageValue;
      showOnWebsite?: boolean;
    }) {
      const formattedTime = hour && minute && period 
        ? `${hour}:${minute.toString().padStart(2, '0')} ${period}`
        : 'Time not set';
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Date not set';
      const visibility = showOnWebsite ? '' : ' [Hidden]';

      return {
        title: `${title || 'Untitled Event'}${visibility}`,
        subtitle: `${formattedDate} at ${formattedTime}${locationName ? ` - ${locationName}` : ''}`,
        media,
      };
    },
  },
} 