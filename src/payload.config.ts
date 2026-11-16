import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { CaseStudies } from './collections/CaseStudies'
import { Clients } from './collections/Clients'
import { Insights } from './collections/Insights'
import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // @ts-expect-error – admin.css is supported at runtime in Payload 3.x but missing from types
    css: path.resolve(dirname, 'styles/admin.css'),
    components: {
      graphics: {
        Logo: '/components/admin/AdminLogo',
        Icon: '/components/admin/AdminIcon',
      },
      beforeDashboard: ['/components/admin/BeforeDashboard'],
    },
    meta: {
      titleSuffix: '— Healthark CMS',
    },
    theme: 'light',
  },
  collections: [
    Users,
    Media,
    // Content
    CaseStudies,
    Insights,
    Services,
    Clients,
    // CMS pages
    Pages,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
