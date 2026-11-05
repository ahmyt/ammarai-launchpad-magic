# AmmarAI Website

Marketing site, tool catalogue, tutorials and blog for [AmmarAI](https://ammarai.com).
The AI app itself lives at https://app.ammarai.com.

## Stack

- TanStack Start (React 19) with Vite
- Tailwind CSS v4
- Backend database and auth for the CMS at `/admin`

## Development

```bash
bun install
bun run dev
```

## Production

Built with `bun run build` and deployed on Plesk (Node.js) at ammarai.com.
Contact form email is sent through the Plesk SMTP server.
