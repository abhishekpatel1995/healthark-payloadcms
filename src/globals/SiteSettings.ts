import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Global settings shared across the entire website.',
  },
  fields: [
    // ── Hero Section ────────────────────────────────────────────────────────
    {
      name: 'hero',
      label: 'Hero Section',
      type: 'group',
      fields: [
        {
          name: 'image',
          label: 'Hero Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Main visual on the right side of the homepage hero. Recommended: 920×680 px, 16:9 ratio.',
          },
        },
        {
          name: 'headline',
          label: 'Headline',
          type: 'text',
          defaultValue: 'Transforming Healthcare Through Intelligence and Innovation',
        },
        {
          name: 'subtext',
          label: 'Subtext',
          type: 'textarea',
          defaultValue:
            'A boutique consulting firm serving the global healthcare and life sciences industry. We combine domain expertise, scientific rigour, and advanced analytics to deliver executable solutions.',
        },
        {
          name: 'ctaPrimaryLabel',
          label: 'Primary CTA Label',
          type: 'text',
          defaultValue: 'Explore Our Services',
        },
        {
          name: 'ctaPrimaryUrl',
          label: 'Primary CTA URL',
          type: 'text',
          defaultValue: '/capabilities',
        },
        {
          name: 'ctaSecondaryLabel',
          label: 'Secondary CTA Label',
          type: 'text',
          defaultValue: 'Contact Us',
        },
        {
          name: 'ctaSecondaryUrl',
          label: 'Secondary CTA URL',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },

    // ── Social Links ────────────────────────────────────────────────────────
    {
      name: 'social',
      label: 'Social Media Links',
      type: 'group',
      fields: [
        { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
        { name: 'twitter', label: 'Twitter / X URL', type: 'text' },
        { name: 'instagram', label: 'Instagram URL', type: 'text' },
        { name: 'youtube', label: 'YouTube URL', type: 'text' },
        { name: 'facebook', label: 'Facebook URL', type: 'text' },
      ],
    },

    // ── Office Addresses ────────────────────────────────────────────────────
    {
      name: 'offices',
      label: 'Office Addresses',
      type: 'array',
      fields: [
        { name: 'city', label: 'City', type: 'text', required: true },
        { name: 'address', label: 'Full Address', type: 'textarea', required: true },
      ],
    },

    // ── Contact ─────────────────────────────────────────────────────────────
    {
      name: 'email',
      label: 'Contact Email',
      type: 'email',
      defaultValue: 'contact@healthark.ai',
    },

    // ── SEO ─────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      label: 'Default SEO',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          label: 'Default Meta Title',
          type: 'text',
          defaultValue: 'Healthark | Healthcare & Life Sciences Consulting',
        },
        {
          name: 'metaDescription',
          label: 'Default Meta Description',
          type: 'textarea',
          defaultValue:
            'Healthark is a boutique healthcare and life sciences consulting firm delivering strategy, analytics, and digital health solutions globally since 2016.',
        },
        {
          name: 'ogImage',
          label: 'Default OG / Share Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Shown when pages are shared on social media. Recommended: 1200×630 px.',
          },
        },
      ],
    },
  ],
}
