# This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

This boilerplate is already including Material-Ui and Tailwindcss for styling. Using Prisma for ORM Postgresql for database, adding typescript as feature.

## Getting Started

First, create .env file on project root:

```bash
touch .env
```

Go to heroku.com then create 2 new apps
One for Production another one for development (shadow database) add those URL to .env file:

DATABASE_URL="postgres://some-value-here"
SHADOW_DATABASE_URL="postgres://some-value-here"

Then, create one model for instance:
`model Sighting {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  latitude  Float
  longitude Float
}`

credit: [Building a Backend for React](https://www.youtube.com/watch?v=Bqacj0iOL68&t=825s)

after you have first model go to your terminal at your project root run this command:

`npx prisma migrate dev --preview-feature`

you will be prompt for '? Name of migration'
you can type: 'CreateSighting'

Prisma will be Generated Prisma Client for you.

Second, run the development server:

```bash
npm i
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Documentation

[Prisma-client](https://www.prisma.io/docs/concepts/components/prisma-client)
[Prisma-getting-started](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres)
