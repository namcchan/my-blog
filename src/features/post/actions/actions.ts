'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { UpdatePostSchema } from '../api/update-post';

export const updatePost = async (id: string, payload: UpdatePostSchema) => {
  'use server';
  const session = await auth();
  const userId = session?.user?.id;

  return prisma.post.update({
    where: {
      id: id,
      authorId: userId,
    },
    data: {
      ...payload,
    },
  });
};
