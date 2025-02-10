FROM node:20-alpine AS base
WORKDIR /app

# By copying only the package.json and yarn.lock here, we ensure that the following `-deps` steps are independent of the source code.
# Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json yarn.lock ./

FROM base AS prod-deps
RUN yarn install --frozen-lockfile --production

FROM base AS build-deps
RUN yarn install

FROM build-deps AS build
COPY . .
RUN yarn build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Bind to all interfaces
ENV HOST=0.0.0.0
# Port to listen on
ENV PORT=3000
# Just convention, not required
EXPOSE 3000

CMD yarn start