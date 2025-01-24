import { defineType, defineField } from 'sanity'

export const ministry = defineType({
  name: 'ministry',
  title: 'Ministries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ministry Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'leader',
      title: 'Ministry Leader',
      type: 'reference',
      to: [{ type: 'staff' }],
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
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: rule => rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      leader: 'leader.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const {title, leader, media} = selection
      return {
        title: title || '',
        subtitle: leader ? `Led by ${leader}` : '',
        media,
      }
    },
  },
}) 