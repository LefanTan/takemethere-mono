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

FROM node
WORKDIR /app

ARG NODE_ENV="production"

COPY package.json package-lock.json ./
COPY prisma ./

# installs only production dependencies
RUN npm ci

COPY --from=build ./ ./
USER node

ENV DATABASE_URL ${DATABASE_URL}

CMD ["npm", "run", "start"]