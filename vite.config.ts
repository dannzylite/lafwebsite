import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: false,
      },
      pages: [
        { path: '/' },
        { path: '/about' },
        { path: '/programs' },
        { path: '/projects' },
        { path: '/get-involved' },
        { path: '/media' },
        { path: '/contact' },
      ],
    }),
    viteReact(),
  ],
})

export default config
