# Production Build
# Google Cloud Run will inject a $PORT env variable which will be consumed by Express during build. Ex. ENV PORT 5080

###############
# build stage #
###############

FROM node:16-alpine AS build
WORKDIR /app

COPY package.json package-lock.json tsconfig.json swagger-output.json ./
# installs both production and dev dependencies
RUN npm ci

COPY src ./src
RUN npm run build


###############
# final stage #
###############

FROM node:16-slim

RUN apt-get update
# Open SSL required for Prisma
RUN apt-get install -y openssl

WORKDIR /app

ENV PORT ${PORT}
ENV DATABASE_URL ${_DATABASE_URL}

ARG NODE_ENV="production"

COPY package.json package-lock.json ./
# installs only production dependencies
RUN npm ci --only=prod

# Copy prisma config
COPY /prisma ./
RUN npm run apply-migration

# Copy build files from Build step
COPY --from=build /app/dist ./dist
USER node


CMD ["npm", "run", "start"]