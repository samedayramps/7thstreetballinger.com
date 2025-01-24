import { defineType, defineField } from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Locations',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'isMainLocation',
      title: 'Is Main Church Location',
      type: 'boolean',
      description: 'If checked, this location will use the main church address',
      initialValue: false,
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      hidden: ({ document }) => Boolean(document?.isMainLocation),
      fields: [
        defineField({
          name: 'street',
          title: 'Street Address',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'state',
          title: 'State',
          type: 'string',
          options: {
            list: ['TX'], // Can be expanded if needed
          },
          validation: rule => rule.required(),
        }),
        defineField({
          name: 'zipCode',
          title: 'ZIP Code',
          type: 'string',
          validation: rule => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Location Description',
      type: 'text',
      rows: 2,
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
    prepare(selection) {
      const {title, isMainLocation, street, city, state, zipCode} = selection
      const address = isMainLocation 
        ? '1200 N 7th St, Ballinger, TX 76821'
        : `${street}, ${city}, ${state} ${zipCode}`
      return {
        title,
        subtitle: address,
      }
    },
  },
}) 