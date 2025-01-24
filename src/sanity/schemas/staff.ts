import { defineType, defineField } from 'sanity'

export const staff = defineType({
  name: 'staff',
  title: 'Staff & Leadership',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'showOnWebsite',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Toggle to control whether this staff member appears on the public website',
      initialValue: true,
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: rule => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: rule => rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Last Name',
      name: 'lastNameAsc',
      by: [
        { field: 'lastName', direction: 'asc' },
        { field: 'firstName', direction: 'asc' }
      ],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      role: 'role',
      media: 'profileImage',
      showOnWebsite: 'showOnWebsite',
    },
    prepare(selection) {
      const {firstName, lastName, role, media, showOnWebsite} = selection
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Unnamed Staff Member'
      const visibility = showOnWebsite ? '' : ' [Hidden]'
      return {
        title: `${fullName}${visibility}`,
        subtitle: role || 'No role specified',
        media,
      }
    },
  },
}) 