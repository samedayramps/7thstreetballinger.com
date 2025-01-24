import { defineType, defineField } from 'sanity'

export const prayerRequest = defineType({
  name: 'prayerRequest',
  title: 'Prayer Requests',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: rule => rule.email(),
    }),
    defineField({
      name: 'isConfidential',
      title: 'Keep Request Confidential',
      type: 'boolean',
      description: 'If checked, this request will only be shared with pastoral staff',
      initialValue: false,
    }),
    defineField({
      name: 'request',
      title: 'Prayer Request',
      type: 'text',
      rows: 6,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Praying', value: 'praying' },
          { title: 'Answered', value: 'answered' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'followUp',
      title: 'Requires Follow Up',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'pastoralNotes',
      title: 'Pastoral Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'request',
      confidential: 'isConfidential',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, confidential, status} = selection
      const truncatedRequest = subtitle ? subtitle.slice(0, 50) + (subtitle.length > 50 ? '...' : '') : ''
      const confidentialPrefix = confidential ? '[Confidential] ' : ''
      return {
        title: confidentialPrefix + (title || 'Anonymous Request'),
        subtitle: `${truncatedRequest} (${status})`,
      }
    },
  },
}) 