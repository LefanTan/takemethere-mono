# Production Build
# Google Cloud Run will inject a $PORT env variable which will be consumed by Express during runtime. Ex. ENV PORT 5080
###############
# build stage #
###############

FROM node:16-alpine AS build
ENV PORT ${PORT}
ENV DATABASE_URL ${_DATABASE_URL}

WORKDIR /app

COPY package.json package-lock.json tsconfig.json swagger-output.json ./
# installs both production and dev dependencies
RUN npm ci

COPY src ./src
RUN npm run build


###############
# final stage #
###############

FROM node:16-slim as final

ENV DATABASE_URL ${_DATABASE_URL}

WORKDIR /app

RUN apt-get update
# Open SSL required for Prisma
RUN apt-get install -y openssl

COPY package.json package-lock.json ./
# installs only production dependencies
RUN npm ci --only=prod

COPY /prisma ./
# Copy build files from Build step
COPY --from=build /app/dist ./dist
USER node

CMD ["npm", "run", "start"]