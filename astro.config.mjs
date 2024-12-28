import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import node from "@astrojs/node";


// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), icon()],
  adapter: node({
    mode: 'standalone',
  }),
  site: 'https://app.polrfx.ng',
  server:{
		port: 9000,
		host: true
	},
	vite:{
		ssr: {
			noExternal: ['path-to-regexp'],
		  },
		preview: {
			port: 9000,
			host: true
		}
	}
});