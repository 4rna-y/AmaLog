import { MetadataRoute } from 'next'
import { BlogApi } from '@/api/blog'

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arnay.net'

  const blogs = await BlogApi.getBlogs(1000, 1)

  const blogUrls = blogs?.blogs
    .filter(blog => blog.status === 'PUBLISHED')
    .map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || []

  return blogUrls
}
