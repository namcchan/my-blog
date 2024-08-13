import prisma from '@/lib/prisma';

export const getUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
