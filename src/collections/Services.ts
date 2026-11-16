import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
    description: 'Capabilities, business units, and solutions shown across the site.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier, e.g. "real-world-evidence"',
      },
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Capability', value: 'capability' },
        { label: 'Business Unit', value: 'business-unit' },
        { label: 'Solution', value: 'solution' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in listings.',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: 'Used on service detail pages and cards.',
      },
    },
    {
      name: 'excerpt',
      label: 'Short Description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'One or two sentences shown on listing cards.',
      },
    },
    {
      name: 'content',
      label: 'Full Description',
      type: 'richText',
      admin: {
        description: 'Used on the individual service detail page.',
      },
    },
    {
      name: 'icon',
      label: 'Icon Name',
      type: 'text',
      admin: {
        description: 'Heroicons name used in the services grid, e.g. "chart-bar".',
      },
    },
  ],
}
