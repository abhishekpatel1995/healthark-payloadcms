import type { Block, CollectionConfig, Field } from 'payload'

// ─── Animation option sets ────────────────────────────────────────────────────

const elemAnimOptions = [
  { label: '— None', value: 'none' },
  { label: 'Fade In', value: 'fade-in' },
  { label: 'Fade Up', value: 'fade-up' },
  { label: 'Fade Down', value: 'fade-down' },
  { label: 'Slide from Left', value: 'slide-left' },
  { label: 'Slide from Right', value: 'slide-right' },
  { label: 'Zoom In', value: 'zoom-in' },
  { label: 'Text Reveal (char by char)', value: 'text-reveal' },
  { label: 'Word by Word', value: 'word-by-word' },
]

const groupAnimOptions = [
  { label: '— None', value: 'none' },
  { label: 'Stagger — Fade Up', value: 'fade-up' },
  { label: 'Stagger — Fade In', value: 'fade-in' },
  { label: 'Stagger — Zoom In', value: 'zoom-in' },
  { label: 'Stagger — Slide from Left', value: 'slide-left' },
  { label: 'Stagger — Slide from Right', value: 'slide-right' },
]

// ─── Field factory helpers ────────────────────────────────────────────────────

function elemAnim(name: string, label: string): Field {
  return {
    name,
    label,
    type: 'select',
    defaultValue: 'none',
    options: elemAnimOptions,
    admin: {
      description: 'GSAP scroll-triggered animation for this element.',
    },
  }
}

function groupAnim(name: string, label: string): Field {
  return {
    name,
    label,
    type: 'select',
    defaultValue: 'none',
    options: groupAnimOptions,
    admin: {
      description: 'Stagger animation applied to each item in this group.',
    },
  }
}

// ─── Block definitions ────────────────────────────────────────────────────────

const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero Section', plural: 'Hero Sections' },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    elemAnim('headingAnimation', 'Heading — Animation'),
    {
      name: 'subtext',
      label: 'Subtext',
      type: 'textarea',
    },
    elemAnim('subtextAnimation', 'Subtext — Animation'),
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Displayed on the right side of the hero. Recommended: 920×680 px.',
      },
    },
    elemAnim('imageAnimation', 'Hero Image — Animation'),
    {
      name: 'ctaPrimary',
      label: 'Primary CTA',
      type: 'group',
      fields: [
        { name: 'label', label: 'Button Label', type: 'text', defaultValue: 'Explore Our Services' },
        { name: 'url', label: 'URL', type: 'text', defaultValue: '/capabilities' },
      ],
    },
    {
      name: 'ctaSecondary',
      label: 'Secondary CTA (optional)',
      type: 'group',
      fields: [
        { name: 'label', label: 'Button Label', type: 'text' },
        { name: 'url', label: 'URL', type: 'text' },
      ],
    },
    elemAnim('ctaAnimation', 'CTA Buttons — Animation'),
    {
      name: 'variant',
      label: 'Background Style',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark Navy (Homepage style)', value: 'dark' },
        { label: 'Brand Blue', value: 'primary' },
        { label: 'White / Light', value: 'light' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'eyebrowLabel',
      label: 'Eyebrow Label',
      type: 'text',
      admin: {
        description: 'Small label above the heading, e.g. "Healthcare & Life Sciences Consulting".',
      },
    },
    {
      name: 'rotatingWords',
      label: 'Typewriter Words (optional)',
      type: 'array',
      admin: {
        description: 'Words that cycle after the heading with a typewriter effect. E.g. "grow faster", "transform digitally".',
      },
      fields: [
        { name: 'word', label: 'Word / Phrase', type: 'text', required: true },
      ],
    },
  ],
}

const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Rich Text Content', plural: 'Rich Text Content Blocks' },
  fields: [
    {
      name: 'richText',
      label: 'Content',
      type: 'richText',
      required: true,
    },
    elemAnim('contentAnimation', 'Content — Animation'),
    {
      name: 'width',
      label: 'Content Width',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default (readable line-length)', value: 'default' },
        { label: 'Full width', value: 'full' },
        { label: 'Narrow', value: 'narrow' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats Strip', plural: 'Stats Strips' },
  fields: [
    {
      name: 'heading',
      label: 'Section Heading (optional)',
      type: 'text',
    },
    elemAnim('headingAnimation', 'Heading — Animation'),
    {
      name: 'stats',
      label: 'Stats',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'value', label: 'Value', type: 'text', required: true, admin: { description: 'e.g. "250+" or "2016"' } },
        { name: 'label', label: 'Label', type: 'text', required: true, admin: { description: 'e.g. "Projects Completed"' } },
      ],
    },
    groupAnim('statsAnimation', 'Stats Items — Animation'),
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Brand Blue', value: 'primary' },
        { label: 'Dark Navy', value: 'dark' },
        { label: 'Teal / Accent', value: 'accent' },
        { label: 'Light Grey', value: 'surface' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  labels: { singular: 'Services / Capabilities Grid', plural: 'Services / Capabilities Grids' },
  fields: [
    { name: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'Our Capabilities' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    groupAnim('cardsAnimation', 'Service Cards — Animation'),
    {
      name: 'filter',
      label: 'Filter by Category',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Capabilities only', value: 'capability' },
        { label: 'Business Units only', value: 'business-unit' },
        { label: 'Solutions only', value: 'solution' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Which services to pull from the Services collection.',
      },
    },
    {
      name: 'limit',
      label: 'Max Items Shown',
      type: 'number',
      defaultValue: 9,
      admin: { position: 'sidebar' },
    },
    {
      name: 'showCTA',
      label: 'Show "View All" CTA',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}

const CaseStudiesBlock: Block = {
  slug: 'caseStudies',
  labels: { singular: 'Case Studies Preview', plural: 'Case Studies Previews' },
  fields: [
    { name: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'Case Studies' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    groupAnim('cardsAnimation', 'Case Study Cards — Animation'),
    {
      name: 'selectionMode',
      label: 'Selection Mode',
      type: 'select',
      defaultValue: 'latest',
      options: [
        { label: 'Latest (auto)', value: 'latest' },
        { label: 'Manually pick', value: 'manual' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      label: 'Manually Selected Case Studies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionMode === 'manual',
        description: 'Pick specific case studies when Selection Mode is set to "Manually pick".',
      },
    },
    {
      name: 'limit',
      label: 'Max Items Shown (Latest mode)',
      type: 'number',
      defaultValue: 3,
      admin: {
        position: 'sidebar',
        condition: (_, siblingData) => siblingData?.selectionMode !== 'manual',
      },
    },
    {
      name: 'showCTA',
      label: 'Show "See all" link',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}

const InsightsBlock: Block = {
  slug: 'insights',
  labels: { singular: 'Insights Preview', plural: 'Insights Previews' },
  fields: [
    { name: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'Latest Insights' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    groupAnim('cardsAnimation', 'Insight Cards — Animation'),
    {
      name: 'typeFilter',
      label: 'Filter by Type',
      type: 'select',
      defaultValue: 'all',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Blog', value: 'blog' },
        { label: 'Article', value: 'article' },
        { label: 'Report', value: 'report' },
        { label: 'Podcast', value: 'podcast' },
        { label: 'Event', value: 'event' },
        { label: 'Press Release', value: 'press-release' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'limit',
      label: 'Max Items Shown',
      type: 'number',
      defaultValue: 3,
      admin: { position: 'sidebar' },
    },
    {
      name: 'showCTA',
      label: 'Show "View All" link',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}

const ClientsBlock: Block = {
  slug: 'clients',
  labels: { singular: 'Clients Logo Strip', plural: 'Clients Logo Strips' },
  fields: [
    {
      name: 'heading',
      label: 'Label Above Logos',
      type: 'text',
      defaultValue: 'Trusted by leading healthcare companies worldwide',
    },
    elemAnim('headingAnimation', 'Label — Animation'),
    {
      name: 'selectionMode',
      label: 'Selection Mode',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured clients only (auto)', value: 'featured' },
        { label: 'All clients (auto)', value: 'all' },
        { label: 'Manually pick', value: 'manual' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      label: 'Manually Selected Clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionMode === 'manual',
      },
    },
    {
      name: 'showCTA',
      label: 'Show "View all clients" link',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}

const CTABannerBlock: Block = {
  slug: 'ctaBanner',
  labels: { singular: 'CTA Banner', plural: 'CTA Banners' },
  fields: [
    { name: 'heading', label: 'Heading', type: 'text', required: true },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subtext', label: 'Subtext (optional)', type: 'textarea' },
    elemAnim('subtextAnimation', 'Subtext — Animation'),
    {
      name: 'ctaPrimary',
      label: 'Primary Button',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Get in Touch' },
        { name: 'url', type: 'text', defaultValue: '/contact' },
      ],
    },
    {
      name: 'ctaSecondary',
      label: 'Secondary Button (optional)',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    elemAnim('ctaAnimation', 'Buttons — Animation'),
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'accent',
      options: [
        { label: 'Teal / Accent', value: 'accent' },
        { label: 'Brand Blue', value: 'primary' },
        { label: 'Dark Navy', value: 'dark' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const TwoColumnBlock: Block = {
  slug: 'twoColumn',
  labels: { singular: 'Two-Column (Image + Text)', plural: 'Two-Column Blocks' },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Label (optional)',
      type: 'text',
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
    },
    elemAnim('headingAnimation', 'Heading — Animation'),
    {
      name: 'richText',
      label: 'Body',
      type: 'richText',
    },
    elemAnim('bodyAnimation', 'Body Text — Animation'),
    {
      name: 'cta',
      label: 'CTA Link (optional)',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Recommended: 800×600 px.',
      },
    },
    elemAnim('imageAnimation', 'Image — Animation'),
    {
      name: 'imagePosition',
      label: 'Image Position',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right (text left)', value: 'right' },
        { label: 'Left (text right)', value: 'left' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'background',
      label: 'Section Background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Grey', value: 'surface' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const TeamGridBlock: Block = {
  slug: 'teamGrid',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    { name: 'heading', label: 'Section Heading', type: 'text', defaultValue: 'Our Leadership' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    groupAnim('membersAnimation', 'Team Members — Animation'),
    {
      name: 'members',
      label: 'Team Members',
      type: 'array',
      fields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'title', label: 'Job Title', type: 'text', required: true },
        { name: 'bio', label: 'Short Bio', type: 'textarea' },
        {
          name: 'photo',
          label: 'Photo',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Headshot. Recommended: 400×400 px, square.',
          },
        },
        { name: 'linkedin', label: 'LinkedIn URL (optional)', type: 'text' },
      ],
    },
  ],
}

const AccordionBlock: Block = {
  slug: 'accordion',
  labels: { singular: 'Accordion / FAQ', plural: 'Accordions / FAQs' },
  fields: [
    { name: 'heading', label: 'Section Heading (optional)', type: 'text' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    groupAnim('itemsAnimation', 'Accordion Items — Animation'),
    {
      name: 'items',
      label: 'Items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', label: 'Question / Title', type: 'text', required: true },
        { name: 'answer', label: 'Answer / Body', type: 'richText', required: true },
      ],
    },
  ],
}

const TimelineBlock: Block = {
  slug: 'timeline',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  fields: [
    { name: 'heading', label: 'Section Heading (optional)', type: 'text' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    groupAnim('itemsAnimation', 'Timeline Items — Animation'),
    {
      name: 'items',
      label: 'Timeline Items',
      type: 'array',
      minRows: 2,
      fields: [
        { name: 'year', label: 'Year / Date Label', type: 'text', required: true, admin: { description: 'e.g. "2024" or "Q1 2024"' } },
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description (optional)', type: 'textarea' },
      ],
    },
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'Light Grey', value: 'surface' },
        { label: 'White', value: 'white' },
        { label: 'Dark Navy', value: 'dark' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const TestimonialsBlock: Block = {
  slug: 'testimonials',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'heading', label: 'Section Heading (optional)', type: 'text' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    groupAnim('cardsAnimation', 'Testimonial Cards — Animation'),
    {
      name: 'items',
      label: 'Testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', label: 'Quote', type: 'textarea', required: true },
        { name: 'authorName', label: 'Author Name', type: 'text', required: true },
        { name: 'authorTitle', label: 'Job Title (optional)', type: 'text' },
        { name: 'authorCompany', label: 'Company (optional)', type: 'text' },
        {
          name: 'photo',
          label: 'Author Photo (optional)',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Square headshot. Recommended: 100×100 px.' },
        },
      ],
    },
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'Light Grey', value: 'surface' },
        { label: 'White', value: 'white' },
        { label: 'Dark Navy', value: 'dark' },
        { label: 'Brand Blue', value: 'primary' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video Embed', plural: 'Video Embeds' },
  fields: [
    { name: 'heading', label: 'Section Heading (optional)', type: 'text' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    {
      name: 'videoUrl',
      label: 'Video URL',
      type: 'text',
      required: true,
      admin: {
        description: 'Paste a YouTube or Vimeo URL, e.g. https://youtu.be/dQw4w9WgXcQ',
      },
    },
    elemAnim('videoAnimation', 'Video — Animation'),
    {
      name: 'posterImage',
      label: 'Custom Poster / Thumbnail (optional)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Shown before the video plays. Omit to use the platform default thumbnail.',
      },
    },
    { name: 'caption', label: 'Caption (optional)', type: 'text' },
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Grey', value: 'surface' },
        { label: 'Dark Navy', value: 'dark' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    { name: 'heading', label: 'Heading', type: 'text', defaultValue: 'Get in Touch' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    {
      name: 'subheading',
      label: 'Sub-heading (optional)',
      type: 'textarea',
      defaultValue: 'Fill in the form and our team will get back to you within 1 business day.',
    },
    { name: 'submitLabel', label: 'Submit Button Label', type: 'text', defaultValue: 'Send Message' },
    {
      name: 'successMessage',
      label: 'Success Message',
      type: 'text',
      defaultValue: "Thank you! We'll be in touch shortly.",
    },
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'Light Grey', value: 'surface' },
        { label: 'White', value: 'white' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const FeatureScrollBlock: Block = {
  slug: 'featureScroll',
  labels: { singular: 'Feature Scroll (Pinned)', plural: 'Feature Scroll Sections' },
  fields: [
    { name: 'eyebrow', label: 'Eyebrow Label (optional)', type: 'text' },
    { name: 'heading', label: 'Heading', type: 'text' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    {
      name: 'items',
      label: 'Feature Steps',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        {
          name: 'icon',
          label: 'Icon / Step Number',
          type: 'text',
          admin: { description: 'e.g. an emoji "📊" or step number "01".' },
        },
        {
          name: 'image',
          label: 'Step Image (optional)',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Shown in the pinned panel when this step is active. Recommended: 800×600 px.' },
        },
      ],
    },
    {
      name: 'stickyImage',
      label: 'Default Pinned Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Shown when no step-specific image is active. Recommended: 800×600 px.',
      },
    },
    {
      name: 'imagePosition',
      label: 'Pinned Panel Side',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Right (steps scroll on left)', value: 'right' },
        { label: 'Left (steps scroll on right)', value: 'left' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Grey', value: 'surface' },
        { label: 'Dark Navy', value: 'dark' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

const MetricsBarBlock: Block = {
  slug: 'metricsBar',
  labels: { singular: 'Metrics / Impact Bars', plural: 'Metrics / Impact Bars' },
  fields: [
    { name: 'heading', label: 'Section Heading (optional)', type: 'text' },
    elemAnim('headingAnimation', 'Heading — Animation'),
    { name: 'subheading', label: 'Sub-heading (optional)', type: 'textarea' },
    {
      name: 'layout',
      label: 'Layout Style',
      type: 'select',
      defaultValue: 'bars',
      options: [
        { label: 'Horizontal Bars', value: 'bars' },
        { label: 'Circular Rings', value: 'rings' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Grey', value: 'surface' },
        { label: 'Dark Navy', value: 'dark' },
        { label: 'Brand Blue', value: 'primary' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      label: 'Metrics',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      fields: [
        { name: 'label', label: 'Label', type: 'text', required: true, admin: { description: 'e.g. "Client Retention"' } },
        {
          name: 'percentage',
          label: 'Percentage (0–100)',
          type: 'number',
          required: true,
          admin: { description: 'Numeric value only. The % sign is added automatically.' },
        },
        { name: 'description', label: 'Short Description (optional)', type: 'text' },
        {
          name: 'color',
          label: 'Bar / Ring Color',
          type: 'select',
          defaultValue: 'accent',
          options: [
            { label: 'Teal (Accent)', value: 'accent' },
            { label: 'Brand Blue', value: 'primary' },
            { label: 'White', value: 'white' },
          ],
        },
      ],
    },
  ],
}

const TickerBlock: Block = {
  slug: 'ticker',
  labels: { singular: 'Scrolling Ticker', plural: 'Scrolling Tickers' },
  fields: [
    {
      name: 'eyebrow',
      label: 'Eyebrow Label (optional)',
      type: 'text',
      admin: { description: 'Small label above the ticker strip, e.g. "Trusted by 500+ professionals"' },
    },
    { name: 'heading', label: 'Section Heading (optional)', type: 'text' },
    {
      name: 'rows',
      label: 'Rows',
      type: 'select',
      defaultValue: 'one',
      options: [
        { label: 'Single Row', value: 'one' },
        { label: 'Double Row (alternating directions)', value: 'two' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'speed',
      label: 'Scroll Speed',
      type: 'number',
      defaultValue: 50,
      admin: {
        position: 'sidebar',
        description: 'Pixels per second. Recommended: 30 (slow) · 50 (normal) · 90 (fast)',
      },
    },
    {
      name: 'direction',
      label: 'Primary Direction',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left →', value: 'left' },
        { label: 'Right ←', value: 'right' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'pauseOnHover',
      label: 'Pause on Hover',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'separator',
      label: 'Separator Between Items',
      type: 'text',
      defaultValue: '•',
      admin: {
        position: 'sidebar',
        description: 'Character between items — e.g. "•" "★" "|"',
      },
    },
    {
      name: 'variant',
      label: 'Background',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Grey', value: 'surface' },
        { label: 'Dark Navy', value: 'dark' },
        { label: 'Brand Blue', value: 'primary' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      label: 'Ticker Items',
      type: 'array',
      minRows: 3,
      fields: [
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          required: true,
          admin: { description: 'Name, company, achievement, stat, etc.' },
        },
        {
          name: 'emoji',
          label: 'Emoji / Icon (optional)',
          type: 'text',
          admin: { description: 'e.g. "👤" "🏥" "⭐" "✅" — shown before the text' },
        },
        {
          name: 'type',
          label: 'Item Style',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Person / Name (blue pill)', value: 'person' },
            { label: 'Company / Partner (teal pill)', value: 'company' },
            { label: 'Achievement / Stat (amber pill)', value: 'achievement' },
          ],
        },
      ],
    },
  ],
}

// ─── Pages collection ─────────────────────────────────────────────────────────

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Flexible pages assembled from reusable content blocks.',
    listSearchableFields: ['title', 'slug'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'e.g. "about-us" or "capabilities/digital-health"',
      },
    },

    // ── SEO (per-page override of SiteSettings defaults) ──────────────────
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'metaTitle', label: 'Meta Title', type: 'text' },
        { name: 'metaDescription', label: 'Meta Description', type: 'textarea' },
        {
          name: 'ogImage',
          label: 'OG / Share Image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Recommended: 1200×630 px.' },
        },
      ],
    },

    // ── Block layout ──────────────────────────────────────────────────────
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: [
        HeroBlock,
        ContentBlock,
        StatsBlock,
        ServicesGridBlock,
        CaseStudiesBlock,
        InsightsBlock,
        ClientsBlock,
        CTABannerBlock,
        TwoColumnBlock,
        TeamGridBlock,
        AccordionBlock,
        TimelineBlock,
        TestimonialsBlock,
        VideoBlock,
        ContactFormBlock,
        FeatureScrollBlock,
        MetricsBarBlock,
        TickerBlock,
      ],
    },
  ],
}
