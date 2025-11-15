import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/blog/',
        disallow: ['/', '/about', '/contact', '/admin/'],
      },
    ],
    sitemap: 'https://arnay.net/sitemap.xml',
  }
}
