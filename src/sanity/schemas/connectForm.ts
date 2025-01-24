import { defineType, defineField } from 'sanity'

export const connectForm = defineType({
  name: 'connectForm',
  title: 'Connect Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: rule => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'isNewVisitor',
      title: 'Is New Visitor',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
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
          { title: 'In Progress', value: 'inProgress' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare(selection) {
      const {title, subtitle, status} = selection
      return {
        title: title || 'Unnamed Contact',
        subtitle: `${subtitle} (${status})`,
      }
    },
  },
}) 