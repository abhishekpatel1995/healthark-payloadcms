import type { CollectionConfig } from 'payload'

export const Insights: CollectionConfig = {
  slug: 'insights',
  labels: {
    singular: 'Insight',
    plural: 'Insights',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedDate', 'featured'],
    description: 'Blogs, articles, reports, podcasts, events, and all other content types.',
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
        description: 'URL-friendly identifier, e.g. "obesity-market-report-2025"',
      },
    },
    {
      name: 'type',
      label: 'Content Type',
      type: 'select',
      required: true,
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Article', value: 'article' },
        { label: 'Report', value: 'report' },
        { label: 'Podcast', value: 'podcast' },
        { label: 'Event', value: 'event' },
        { label: 'Infographic', value: 'infographic' },
        { label: 'Framework', value: 'framework' },
        { label: 'Press Release', value: 'press-release' },
        { label: 'Coffee Table Book', value: 'coffee-table-book' },
        { label: 'Knowledge Series', value: 'knowledge-series' },
        { label: 'Analytics Demo', value: 'analytics-demo' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd MMM yyyy',
        },
      },
    },
    {
      name: 'featured',
      label: 'Featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in featured cards on the homepage.',
      },
    },
    {
      name: 'featuredImage',
      label: 'Featured Image / Thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: 'Thumbnail shown on cards and at the top of the detail page.',
      },
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      admin: {
        description: 'Short description shown on listing cards (2–3 sentences).',
      },
    },
    {
      name: 'author',
      label: 'Author / Host',
      type: 'text',
      admin: {
        description: 'Author name for articles/blogs; host name for podcasts.',
      },
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'externalUrl',
      label: 'External URL',
      type: 'text',
      admin: {
        description: 'For podcasts on YouTube/Spotify or reports hosted externally.',
      },
    },
    {
      name: 'content',
      label: 'Body Content',
      type: 'richText',
      admin: {
        description: 'Full article, blog, or transcript body.',
        condition: (_, siblingData) =>
          !['podcast', 'event', 'analytics-demo'].includes(siblingData?.type),
      },
    },
  ],
}
