import { getCategories, getPosts } from '@/actions/post';
import { ButtonCreatePost } from './_components/button-create-post';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

export default async function PostsPage() {
  const categories = await getCategories();
  const posts = await getPosts();

  return (
    <main className="container px-4 lg:px-8 max-w-5xl flex flex-col py-6">
      <div className="flex justify-between items-center mt-8">
        <div>
          <h1 className="text-xl font-bold">Posts</h1>
          <p className="text-neutral-500">Manage your posts</p>
        </div>

        <ButtonCreatePost />
      </div>
      <div className="mt-8">
        {/* @ts-ignore */}
        <DataTable columns={columns} data={posts} categories={categories} />
      </div>
    </main>
  );
}
