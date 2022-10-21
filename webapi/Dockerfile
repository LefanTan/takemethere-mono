# Production Build
# Google Cloud Run will inject a $PORT env variable which will be consumed by Express during build. Ex. ENV PORT 5080
FROM node:16.13.1-alpine3.14

# Build step
FROM node as builder
WORKDIR /app

COPY . /app
RUN npm install
RUN npm run build


# Runtime step
FROM node as final
WORKDIR /app

# Reference the database url set in Cloud Build
ENV DATABASE_URL ${_DATABASE_URL}

# Copy files from build step
COPY --from=builder /app/dist /app
COPY --from=builder /app/package.json /app
COPY --from=builder /app/package-lock.json /app

# Install dependencies
RUN npm ci --only=prod
RUN npm install pm2 
RUN npm install typescript


CMD ["npm", "run", "start"]