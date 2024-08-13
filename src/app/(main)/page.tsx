import { getPostsPublic } from '@/actions/post';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const page = parseInt(searchParams?.page ?? 1);
  const { data, totalPage } = await getPostsPublic({ page });

  return (
    <>
      <div className="grid">
        {data?.map((post) => (
          <Link href={`/articles/${post.slug}`} key={post.id}>
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-6 items-start">
                  <Image
                    src={post.image!}
                    alt={post.title!}
                    width={200}
                    height={1}
                    className="rounded-lg"
                  />
                  <div className="">
                    <div className="flex gap-2 mb-2 items-center">
                      <Avatar>
                        <AvatarImage
                          src={post.author.image!}
                          alt={post.author.name!}
                        />
                        <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <h6 className="font-bold">{post.author.name}</h6>
                    </div>

                    <h6 className="text-xl font-bold mb-1">{post.title}</h6>
                    <p className="text-neutral-500 line-clamp-4">
                      {post.description}
                    </p>

                    <Badge className="mt-2">{post.category?.title}</Badge>

                    <p className="text-neutral-500">
                      {dayjs(post.createdAt).format('dddd, MMMM D, YYYY')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {totalPage > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <Button disabled={page <= 1}>
            <Link href={`?page=${page - 1}`}>Previous</Link>
          </Button>
          <Button disabled={page >= totalPage}>
            <Link href={`?page=${page + 1}`}>Next</Link>
          </Button>
        </div>
      )}
    </>
  );
}
