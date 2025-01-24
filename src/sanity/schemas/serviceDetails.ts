import { ValidationRule } from './types'

export const serviceDetails = {
  name: 'serviceDetails',
  title: 'Service Details',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Service Date',
      type: 'date',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'staff' }],
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'sermonTitle',
      title: 'Sermon Title',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'sermonNotes',
      title: 'Sermon Notes/Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'worshipSongs',
      title: 'Worship Songs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Song Title',
              type: 'string',
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: 'artist',
              title: 'Artist/Band',
              type: 'string',
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: 'musicLink',
              title: 'Music Link',
              type: 'object',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      'YouTube',
                      'Spotify',
                      'Apple Music',
                      'SoundCloud',
                      'Other',
                    ],
                  },
                  validation: (Rule: ValidationRule) => Rule.required(),
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: (Rule: ValidationRule) => Rule.required(),
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              artist: 'artist',
              platform: 'musicLink.platform',
            },
            prepare({ title, artist, platform }: {
              title?: string;
              artist?: string;
              platform?: string;
            }) {
              return {
                title: title || 'Untitled Song',
                subtitle: [
                  artist && `by ${artist}`,
                  platform && `on ${platform}`,
                ].filter(Boolean).join(' • '),
              };
            },
          },
        },
      ],
    },
    {
      name: 'scriptureReadings',
      title: 'Scripture Readings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'reference',
              title: 'Scripture Reference',
              type: 'string',
              validation: (Rule: ValidationRule) => Rule.required(),
            },
            {
              name: 'text',
              title: 'Scripture Text',
              type: 'text',
              rows: 4,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'sermonTitle',
      speaker: 'speaker.name',
      date: 'date',
    },
    prepare({ title, speaker, date }: { title?: string; speaker?: string; date?: string }) {
      return {
        title: title || 'Untitled Service',
        subtitle: `${speaker || 'No speaker'} - ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      };
    },
  },
} 