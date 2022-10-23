# Production Build
# Google Cloud Run will inject a $PORT env variable which will be consumed by Express during runtime. Ex. ENV PORT 5080
###############
# build stage #
###############

FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json swagger-output.json ./
# installs both production and dev dependencies
RUN npm ci

COPY . /app

RUN npm run build

###############
# final stage #
###############

FROM node:16-slim as final

RUN apt-get update
# Open SSL required for Prisma
RUN apt-get install -y openssl

# _DATABASE_URL provided by Cloud Build 
# ENV DATABASE_URL ${_DATABASE_URL}

WORKDIR /app

# :EYE: google-service-account is sus, temporarily only
COPY package.json package-lock.json ./

# Only during development
COPY google-service-account.json ./

# installs only production dependencies
RUN npm ci --only=prod

COPY swagger-output.json ./
COPY /prisma /app

# Copy build files from Build step into /dist
COPY --from=build /app/dist ./dist
RUN npx prisma generate

EXPOSE 5080

CMD ["npm", "run", "start"]