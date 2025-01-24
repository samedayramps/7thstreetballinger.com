import { ValidationRule } from './types'

export const prayerRequest = {
  name: 'prayerRequest',
  title: 'Prayer Requests',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.email(),
    },
    {
      name: 'isConfidential',
      title: 'Keep Request Confidential',
      type: 'boolean',
      description: 'If checked, this request will only be shared with pastoral staff',
      initialValue: false,
    },
    {
      name: 'request',
      title: 'Prayer Request',
      type: 'text',
      rows: 6,
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    },
    {
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
    },
    {
      name: 'followUp',
      title: 'Requires Follow Up',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'pastoralNotes',
      title: 'Pastoral Notes',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'request',
      confidential: 'isConfidential',
      status: 'status',
    },
    prepare({ title, subtitle, confidential, status }: { 
      title?: string; 
      subtitle?: string; 
      confidential?: boolean;
      status?: string;
    }) {
      const truncatedRequest = subtitle ? subtitle.slice(0, 50) + (subtitle.length > 50 ? '...' : '') : ''
      const confidentialPrefix = confidential ? '[Confidential] ' : ''
      return {
        title: confidentialPrefix + (title || 'Anonymous Request'),
        subtitle: `${truncatedRequest} (${status})`,
      }
    },
  },
} 