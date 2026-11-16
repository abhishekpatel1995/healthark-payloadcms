import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: 'Client',
    plural: 'Clients',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'industry', 'featured', 'order'],
    description: 'Client logos and info shown on the Clients page and homepage strip.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Client Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Upload an SVG or PNG with transparent background. Recommended: 320×120 px.',
      },
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'select',
      options: [
        { label: 'Pharma', value: 'pharma' },
        { label: 'Biotech', value: 'biotech' },
        { label: 'Medical Devices', value: 'medical-devices' },
        { label: 'Health Tech', value: 'health-tech' },
        { label: 'Healthcare Services', value: 'healthcare-services' },
        { label: 'Insurance & Payer', value: 'insurance-payer' },
        { label: 'Government & Public Health', value: 'government' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      label: 'Show on Homepage',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Include this client in the homepage logo strip.',
      },
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in the logo strip.',
      },
    },
    {
      name: 'website',
      label: 'Website URL',
      type: 'text',
      admin: {
        description: 'Optional — used on the full Clients page.',
      },
    },
  ],
}
