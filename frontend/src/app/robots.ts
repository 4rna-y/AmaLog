import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/blog/',
          '/repository/',
          '/about',
          '/contact',
        ],
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
        ],
      },

      {
        userAgent: [
          'GPTBot',            
          'ChatGPT-User',      
          'CCBot',               
          'anthropic-ai',        
          'Claude-Web',         
          'cohere-ai',         
          'AhrefsBot',         
          'SemrushBot',        
          'DotBot',         
          'MJ12bot',             
          'BLEXBot',            
          'PetalBot',          
          'DataForSeoBot',       
          'Bytespider',          
          'ia_archiver',      
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://4rnay.net/sitemap.xml',
  }
}
