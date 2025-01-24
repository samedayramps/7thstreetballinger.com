import { ValidationRule } from './types'

export const connectForm = {
  name: 'connectForm',
  title: 'Connect Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'isNewVisitor',
      title: 'Is New Visitor',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
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
          { title: 'In Progress', value: 'inProgress' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'new',
    },
    {
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }: { title?: string; subtitle?: string; status?: string }) {
      return {
        title: title || 'Unnamed Contact',
        subtitle: `${subtitle} (${status})`,
      }
    },
  },
} 