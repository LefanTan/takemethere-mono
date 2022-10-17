# Blog Page for TakeMeThere

Built using Astro, feel free to read the [documentation](https://docs.astro.build) on Astro before continuing!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                             |
| :--------------------- | :------------------------------------------------- |
| `npm install`          | Installs dependencies                              |
| `npm run dev`          | Starts local dev server at `localhost:3000`        |
| `npm run build`        | Build your production site to `./dist/`            |
| `npm run preview`      | Preview your build locally, before deploying       |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro preview` |
| `npm run astro --help` | Get help using the Astro CLI                       |

## Why Astro but not NextJS

NextJS as a framework is definitely way more fleshed out and mature than Astro, since Astro is still in its early stages. NextJS already have support for ISR, page-per-basis SSR and so on while Astro only has support for SSR on an all pages basis. Not ideal.

So why Astro?

1. Astro supports Partial Hydration, NextJS hydrates the entire website even if its mostly static whereelse Astro only hydrates components that needs interactivity. Even better, the built in `client:idle` and `client:visible` can greatly help page performance. In conclusion, better performance on Astro Pages
2. @astrojs/image > @nextjs/image. Simply because astro/image generates images on build instead of runtime.

Astro Developers are also incredibly active, making improvements to Astro everyday possibile. By using Astro, I'm also betting on the team and the framework's future.
