'use server';

import { auth } from '@/auth';
import { UpdatePostSchema } from '@/features/post/api/update-post';
import prisma from '@/lib/prisma';
import { getSignedUrlForS3Object } from '@/lib/s3-storage';

export const getCategories = async () => {
  return prisma.category.findMany();
};

export const createUploadUrl = async (filename: string, type: string) => {
  const session = await auth();
  const ext = filename.split('.').pop();
  const key = `${session?.user?.email}/${crypto.randomUUID()}.${ext}`;
  const url = await getSignedUrlForS3Object(key, type);
  const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_BUCKET_URL}/${key}`;

  return {
    url,
    path: key,
    publicUrl,
  };
};

export const getPostById = async (id: string) => {
  const session = await auth();
  return prisma.post.findUnique({
    where: {
      id: id,
      authorId: session?.user?.id,
    },
  });
};

export const getPosts = async () => {
  const session = await auth();
  if (!session) return [];

  return prisma.post.findMany({
    where: {
      authorId: session?.user?.id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      category: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
};

export const createPost = async () => {
  const session = await auth();

  return prisma.post.create({
    data: {
      title: 'Untitled',
      authorId: session?.user?.id!,
    },
  });
};

export const updatePost = async (id: string, payload: UpdatePostSchema) => {
  const session = await auth();

  return prisma.post.update({
    where: {
      id: id,
      authorId: session?.user?.id,
    },
    data: {
      ...payload,
    },
  });
};

export const handleDeletePost = async (id: string) => {
  const session = await auth();

  // TODO: delete image from s3 bucket cloudflare

  return prisma.post.delete({
    where: {
      id: id,
      authorId: session?.user?.id,
    },
  });
};
