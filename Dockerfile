# ---- Build Stage ----
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Install pnpm
    RUN npm install -g pnpm
    
    # Copy only the package files first for better caching
    COPY package.json pnpm-lock.yaml ./
    
    # Install dependencies
    RUN pnpm install
    
    # Copy the rest of the app
    COPY . .
    
    # Build the Astro app
    RUN pnpm run build
    
    # ---- Production Stage ----
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    # Install pnpm in the runner (if you need it for runtime scripts)
    RUN npm install -g pnpm
    
    # Copy only the built output and necessary files
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/package.json ./
    COPY --from=builder /app/pnpm-lock.yaml ./
    COPY --from=builder /app/node_modules ./node_modules
    
    # If you have a public folder for static assets, copy it too
    COPY --from=builder /app/public ./public
    
    # Expose the port Astro runs on (default 4321, but check your config)
    EXPOSE 3000
    
    # Start the app
    CMD ["pnpm", "run", "preview"]