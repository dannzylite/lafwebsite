import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Leke Adeboye Foundation | Empowering Youth. Restoring Hope.' },
      { name: 'description', content: 'The Leke Adeboye Foundation is a faith-driven nonprofit committed to empowering youth, restoring hope, and building sustainable communities across Lagos, Nigeria.' },
      { property: 'og:title', content: 'Leke Adeboye Foundation' },
      { property: 'og:description', content: 'Empowering Youth. Restoring Hope. Building Sustainable Communities.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'theme-color', content: '#0A1929' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NGO',
          name: 'Leke Adeboye Foundation',
          alternateName: 'LAF',
          description: 'Faith-driven nonprofit empowering youth, restoring hope, and building sustainable communities.',
          url: 'https://lekeadeboyefoundation.org',
          foundingDate: '2021',
          areaServed: 'Lagos, Nigeria',
          contactPoint: { '@type': 'ContactPoint', telephone: '+2347062594160', contactType: 'General Inquiry' },
        }),
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
