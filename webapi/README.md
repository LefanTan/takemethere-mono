# Backend service for TakeMeThere

1. To start, go to root folder and run `docker compose up` to start a local postgresql server. Then go to `/webapi` and run `npm run dev` to start the dev server.
   - Run `docker compose stop` to stop the postgres server
2. Place a firebase google service account json name `google-service-account.json` in `/webapi`

**Starting firebase emulator to emulate firebase authentication**

1. Ensure that firebase-cli is installed globally on your machine
2. Run `npm run start:emulator`

## Deployment

Test your `Dockerfile` before deploying!

1. `docker build -t test-webapi .` to build the image
2. `docker run -p 5080:5080 --rm --env DATABASE_URL="postgresql://admin:root@0.0.0.0:5432/postgres?schema=public" --env PORT=5080 --env GOOGLE_APPLICATION_CREDENTIALS=google-service-account.json test-webapi` to run the container

**Run migrations on the cloud**
TODO: Automate this step into a cloud run with [pub/sub](https://cloud.google.com/build/docs/subscribe-build-notifications)

1. Update your .env's `DATABASE_URL` to have the cloud sql url
2. Run `npm run apply-migration`
3. Update your .env's `DATABASE_URL` back to the local one!

Link: https://api.takeme.blog

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                                       |
| :----------------- | :----------------------------------------------------------- |
| `npm install`      | Installs dependencies                                        |
| `npm run dev`      | Starts local dev server at `localhost:5080`                  |
| `npm run build`    | Build your production site to `./dist/`                      |
| `npm run migrate`  | Run migration, append `--name [NAME]` to name your migration |
| `npm run generate` | Generate Prisma Client based on current schema               |
| `npm run start`    | (CI/CD only) Apply pending migration and start webapi server |
