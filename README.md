# davidarthurcole.github.io

Personal portfolio site for David Cole - ServiceNow architect and developer at Rochester Institute of Technology.

Live at [davidarthurcole.me](https://davidarthurcole.me).

## Stack

- [Astro 5](https://astro.build/) - static site framework, builds to `./docs` for deployment
- [Vue 3](https://vuejs.org/) - interactive islands (nav, skill cards, arcade claw animation)
- [Tailwind CSS 3](https://tailwindcss.com/) - utility styling
- TypeScript throughout

## Local development

```bash
npm install
npm run dev
```

Dev server starts at `http://localhost:4321`.

## Build

```bash
npm run build   # outputs to ./docs
npm run preview # serve production build locally
npm run check   # Astro + TypeScript type check
```

## Docker

Builds the site in a Node 22 Alpine stage and serves it with nginx. Intended as a Portainer stack on the `proxy-v6` network with NPM handling TLS and routing by container name.

**Environment variables:**

| Variable | Default | Description |
|---|---|---|
| `CONTAINER_NAME` | `portfolio` | Docker container name |
| `HOST_PORT` | `8080` | Host port mapped to nginx :80 |

```bash
docker compose up -d
```

NPM proxies to `portfolio:80` on `proxy-v6`. To override variables, set them in a Portainer stack `.env` or in the stack environment UI.
