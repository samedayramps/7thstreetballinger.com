import { ValidationRule } from './types'

export const location = {
  name: 'location',
  title: 'Locations',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule: ValidationRule) => Rule.required(),
    },
    {
      name: 'isMainLocation',
      title: 'Is Main Church Location',
      type: 'boolean',
      description: 'If checked, this location will use the main church address',
      initialValue: false,
    },
    {
      name: 'address',
      title: 'Address',
      type: 'object',
      hidden: ({ document }: { document: { isMainLocation?: boolean } }) => document?.isMainLocation,
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
          validation: (Rule: ValidationRule) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule: ValidationRule) => Rule.required(),
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: ['TX'], // Can be expanded if needed
          },
          validation: (Rule: ValidationRule) => Rule.required(),
        },
        {
          name: 'zipCode',
          title: 'ZIP Code',
          type: 'string',
          validation: (Rule: ValidationRule) => Rule.required(),
        },
      ],
    },
    {
      name: 'description',
      title: 'Location Description',
      type: 'text',
      rows: 2,
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
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      isMainLocation: 'isMainLocation',
      street: 'address.street',
      city: 'address.city',
      state: 'address.state',
      zipCode: 'address.zipCode',
    },
    prepare({ title, isMainLocation, street, city, state, zipCode }: {
      title: string;
      isMainLocation: boolean;
      street?: string;
      city?: string;
      state?: string;
      zipCode?: string;
    }) {
      const address = isMainLocation 
        ? '1200 N 7th St, Ballinger, TX 76821'
        : `${street}, ${city}, ${state} ${zipCode}`;
      return {
        title,
        subtitle: address,
      };
    },
  },
} 