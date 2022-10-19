# Backend service for TakeMeThere

To start, go to root folder and run `docker compose up` to start a local postgresql server. Then go to `/webapi` and run `npm run dev` to start the dev server.

Run `docker compose stop` to stop the postgres server

## Deployment

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
