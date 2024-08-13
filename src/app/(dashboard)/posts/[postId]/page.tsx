import { getCategories, getPostById } from '@/actions/post';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const UpdatePostNoSSR = dynamic(
  () => import('@/features/post/components/update-post'),
  {
    ssr: false,
  }
);

export default async function PostDetailPage({ params }: any) {
  const post = await getPostById(params.postId);
  const categories = await getCategories();
  if (!post) {
    return notFound();
  }

  return (
    <>
      <UpdatePostNoSSR post={post} categories={categories} />
    </>
  );
}
