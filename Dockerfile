FROM node:20-alpine AS base
WORKDIR /app

# By copying only the package.json and pnpm-lock.yaml here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json pnpm-lock.yaml ./

FROM base AS prod-deps
RUN pnpm install --frozen-lockfile --production

FROM base AS build-deps
RUN pnpm install

FROM build-deps AS build
COPY . .
RUN pnpm build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Bind to all interfaces
ENV HOST=0.0.0.0
# Port to listen on
ENV PORT=3000
# Just convention, not required
EXPOSE 3000

CMD pnpm start