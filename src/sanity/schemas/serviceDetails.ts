import { defineType, defineField } from 'sanity'

export const serviceDetails = defineType({
  name: 'serviceDetails',
  title: 'Service Details',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Service Date',
      type: 'date',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{ type: 'staff' }],
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'sermonTitle',
      title: 'Sermon Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'sermonNotes',
      title: 'Sermon Notes/Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'worshipSongs',
      title: 'Worship Songs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Song Title',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'artist',
              title: 'Artist/Band',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'musicLink',
              title: 'Music Link',
              type: 'object',
              fields: [
                defineField({
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
                  validation: rule => rule.required(),
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url',
                  validation: rule => rule.required(),
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              artist: 'artist',
              platform: 'musicLink.platform',
            },
            prepare(selection) {
              const {title, artist, platform} = selection
              return {
                title: title || 'Untitled Song',
                subtitle: [
                  artist && `by ${artist}`,
                  platform && `on ${platform}`,
                ].filter(Boolean).join(' • '),
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'scriptureReadings',
      title: 'Scripture Readings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'reference',
              title: 'Scripture Reference',
              type: 'string',
              validation: rule => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Scripture Text',
              type: 'text',
              rows: 4,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sermonTitle',
      speaker: 'speaker.name',
      date: 'date',
    },
    prepare(selection) {
      const {title, speaker, date} = selection
      return {
        title: title || 'Untitled Service',
        subtitle: `${speaker || 'No speaker'} - ${date ? new Date(date).toLocaleDateString() : 'No date'}`,
      }
    },
  },
}) 