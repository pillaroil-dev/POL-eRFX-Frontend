import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import node from "@astrojs/node";

import { loadEnv } from "vite";
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, SESSION_NAME, JWT_EXPIRES_IN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");


// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), icon()],
  adapter: node({
    mode: 'standalone',
  }),
  experimental: {
	session: {
	  driver: "redis", //Required: the name of the unstorage driver
	  options: {
		name: 'app-sessions',
		consistency: 'strong', // Sessions need strong consistency
		host: REDIS_HOST,
		port: parseInt(REDIS_PORT),
		password: REDIS_PASSWORD,
		maxRetries: 10,
		retryStrategy: (times) => Math.min(times * 50, 2000), // Exponential backoff
		connectTimeout: 100000, // 100 seconds
		keepAlive: 30000, // 30 seconds
		family: 4, // 4 (IPv4) or 6 (IPv6)
		//db: 0, // Database index [0 - 15]
		maxAge: parseInt(JWT_EXPIRES_IN),
	  },
	  cookie: {
		name: SESSION_NAME,
		sameSite: true,
		maxAge: parseInt(JWT_EXPIRES_IN),
	  },
	  ttl: parseInt(JWT_EXPIRES_IN)
	},
  },
  site: 'https://app.polrfx.ng',
  server:{
		port: 3000,
		host: true
	},
	vite:{
		ssr: {
			noExternal: ['path-to-regexp'],
		  },
		preview: {
			port: 3000,
			host: true
		}
	}
});