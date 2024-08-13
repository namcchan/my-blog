import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  {
    title: 'Technology',
    slug: 'technology',
  },
  {
    title: 'Software Development',
    slug: 'software-development',
  },
  {
    title: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
  },
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
  },
  {
    title: 'Lifestyle',
    slug: 'lifestyle',
  },
  {
    title: 'Health & Wellness',
    slug: 'health-wellness',
  },
  {
    title: 'Travel',
    slug: 'travel',
  },
  {
    title: 'Food & Drink',
    slug: 'food-drink',
  },
  {
    title: 'Business',
    slug: 'business',
  },
  {
    title: 'Entrepreneurship',
    slug: 'entrepreneurship',
  },
  {
    title: 'Marketing',
    slug: 'marketing',
  },
  {
    title: 'Finance',
    slug: 'finance',
  },
  {
    title: 'Education',
    slug: 'education',
  },
  {
    title: 'Online Learning',
    slug: 'online-learning',
  },
  {
    title: 'Career Development',
    slug: 'career-development',
  },
  {
    title: 'Languages',
    slug: 'languages',
  },
];

async function main() {
  await prisma.category.createMany({
    data: categories,
  });

  console.log('Seeded categories');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
