This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
docker-compose up -d

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 📚 Tech Stacks

- App Router,
- Server Actions
- Server and Client Components
- Data Fetching, Insertion using [Prisma](https://www.prisma.io/docs/getting-started)
- API Routes and Middlewares
- Authentication using [NextAuth](https://next-auth.js.org/getting-started/example)
- Image Upload using [R2 cloudflare](https://www.cloudflare.com/lp/pg-r2-comparison/?utm_medium=cpc&utm_source=google&utm_campaign=2023-q4-acq-gbl-developers-r2-ge-general-paygo_mlt_all_g_search_bg_exp__dev&utm_content=r2&gad_source=1&gclid=Cj0KCQjwiOy1BhDCARIsADGvQnAPob8DrtROQu5m7w2pAHjkp1ekFGj1IIcy-LWYpUIqP8oLCrAnKhoaAjxGEALw_wcB&gclsrc=aw.ds)
- Styled using [Tailwind CSS](https://tailwindcss.com/)
- UI Components using [Radix-UI](https://radix-ui.com), [Shadcn-UI](https://ui.shadcn.com/)
- WYSIWYG editor using [Novel](https://novel.sh/)
- Forms using [React-Hook-Forms](https://www.react-hook-form.com/)
- Validations using [Zod](https://zod.dev)
- Icons using [Lucide-Icon](https://lucide.dev/icons/)
- Written in [TypeScript](https://www.typescriptlang.org/)

## ⌨️ Code Quality

- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
