import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'publishedDate'],
    description: 'Client case studies displayed on the homepage and Insights section.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Case Study Title',
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
        description: 'URL-friendly identifier, e.g. "rwe-clinical-insights-2026"',
      },
    },
    {
      name: 'tag',
      label: 'Category Tag',
      type: 'text',
      admin: {
        description: 'Short label shown on the card thumbnail, e.g. "Real World Data".',
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      admin: {
        description: 'One or two sentences shown on listing cards.',
      },
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd MMM yyyy',
        },
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured Image / Thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description:
          'Thumbnail shown on the case study card and at the top of the detail page. Recommended: 800×450 px.',
      },
    },
    {
      name: 'clientBackground',
      label: 'Client Background',
      type: 'richText',
    },
    {
      name: 'challenge',
      label: 'Challenge',
      type: 'richText',
    },
    {
      name: 'healtharksRole',
      label: "Healthark's Role",
      type: 'richText',
    },
    {
      name: 'impact',
      label: 'Impact',
      type: 'richText',
    },
  ],
}
