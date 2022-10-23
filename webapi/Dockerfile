# Production Build
# Google Cloud Run will inject a $PORT env variable which will be consumed by Express during runtime. Ex. ENV PORT 5080
###############
# build stage #
###############

FROM node:16-slim AS build

RUN apt-get update
# Open SSL required for Prisma
RUN apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json tsconfig.json swagger-output.json ./
# installs both production and dev dependencies
RUN npm ci

COPY . /app

RUN npx prisma generate
RUN npm run build

###############
# final stage #
###############

FROM node:16-alpine as final

WORKDIR /app

COPY package.json package-lock.json ./
# installs only production dependencies
RUN npm ci --only=prod

COPY swagger-output.json ./
COPY /prisma /app

# Copy build files from Build step into /dist
COPY --from=build /app/dist ./dist

EXPOSE 5080

CMD ["npm", "run", "start"]