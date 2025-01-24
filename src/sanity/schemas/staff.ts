import { ValidationRule } from './types'
import { ImageValue } from '@sanity/types'

export const staff = {
  name: 'staff',
  title: 'Staff & Leadership',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'showOnWebsite',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Toggle to control whether this staff member appears on the public website',
      initialValue: true,
    },
    {
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: ValidationRule) => Rule.required().min(0),
    },
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
    prepare({ firstName, lastName, role, media, showOnWebsite }: { 
      firstName?: string;
      lastName?: string;
      role?: string;
      media?: ImageValue;
      showOnWebsite?: boolean;
    }) {
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Unnamed Staff Member';
      const visibility = showOnWebsite ? '' : ' [Hidden]';
      return {
        title: `${fullName}${visibility}`,
        subtitle: role || 'No role specified',
        media,
      };
    },
  },
} 