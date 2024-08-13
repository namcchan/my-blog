'use server';

import { auth } from '@/auth';
import { UpdatePostSchema } from '@/hooks/update-post';
import prisma from '@/lib/prisma';
import { getSignedUrlForS3Object } from '@/lib/s3-storage';

export const getPostsPublic = async (query?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  let page = query?.page ?? 1;
  if (page < 1) page = 1;
  const skip = (page - 1) * (query?.limit ?? 20);
  const take = query?.limit ?? 20;

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      status: 'published',
    },
    select: {
      id: true,
      title: true,
      slug: true,
      image: true,
      description: true,
      createdAt: true,
      updatedAt: true,
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
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },

    take: take,
    skip: skip,
  });

  const count = await prisma.post.count({ where: { published: true } });

  return {
    data: posts,
    count,
    totalPage: Math.ceil(count / take),
  };
};

export const getPostBySlug = (slug: string) => {
  return prisma.post.findFirst({
    where: { slug, published: true, status: 'published' },
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
        },
      },
    },
  });
};

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

export const handlePublishPost = async (id: string) => {
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: {
      id: id,
      authorId: session?.user?.id,
    },
  });

  if (!post) {
    throw new Error('Post not found');
  }

  if (!post.content || !post.title || !post.image || !post.description) {
    throw new Error('Post content is missing');
  }

  return prisma.post.update({
    where: {
      id: id,
      authorId: session?.user?.id,
    },
    data: {
      published: true,
      status: 'published',
    },
  });
};

export const handleDraftPost = async (id: string) => {
  const session = await auth();

  return prisma.post.update({
    where: {
      id: id,
      authorId: session?.user?.id,
    },
    data: {
      published: false,
      status: 'draft',
    },
  });
};
