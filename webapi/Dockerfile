# Production Build
# Google Cloud Run will inject a $PORT env variable which will be consumed by Express during build. Ex. ENV PORT 5080

FROM node:16.13.1-alpine3.14

WORKDIR /app

# Copy source files
COPY . /app

# Install dependencies
RUN npm ci --only=prod
RUN npm i pm2

# Build for production
RUN npm run build
RUN npx prisma migrate deploy

CMD ["npm", "run", "start"]