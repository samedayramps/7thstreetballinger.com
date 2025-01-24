import { ValidationRule } from './types'
import { SanityAsset } from '@sanity/image-url/lib/types/types'

export const ministry = {
  name: 'ministry',
  title: 'Ministries',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Ministry Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'leader',
      title: 'Ministry Leader',
      type: 'reference',
      to: [{ type: 'staff' }],
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
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.email(),
    },
    {
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      leader: 'leader.name',
      media: 'featuredImage',
    },
    prepare({ title, leader, media }: { title: string; leader?: string; media?: SanityAsset }) {
      return {
        title,
        subtitle: leader ? `Led by ${leader}` : '',
        media,
      };
    },
  },
} 