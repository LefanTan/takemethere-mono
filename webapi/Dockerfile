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

RUN npm run build

###############
# final stage #
###############

# FROM node:16-slim as final

# WORKDIR /app

# # :EYE: google-service-account is sus, temporarily only
# COPY package.json package-lock.json google-service-account.json ./
# # installs only production dependencies
# RUN npm ci

# COPY swagger-output.json ./
# COPY /prisma /app

# # Copy build files from Build step into /dist
# COPY --from=build /app/dist ./dist
# # COPY --from=build /app/node_modules/@prisma/client ./node_modules/@prisma/client
# # COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 5080

CMD ["npm", "run", "start"]