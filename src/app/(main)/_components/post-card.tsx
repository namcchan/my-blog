import { Post } from '@prisma/client';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};
