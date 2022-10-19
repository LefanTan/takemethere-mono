# Production Build
# Google Cloud Run will inject a $PORT env variable which will be consumed by Astro during build. Ex. ENV PORT 8080

FROM node:alpine3.16 as node
FROM node as builder

RUN mkdir -p /usr/src
WORKDIR /usr/src

# Copy source files
COPY . /usr/src

# Install dependencies
RUN npm ci --only=prod

# Build app
RUN npm run build

# Start app 
CMD npm run start