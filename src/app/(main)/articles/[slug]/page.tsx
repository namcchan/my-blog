import { getPostBySlug } from '@/actions/post';
import { shimmer, toBase64 } from '@/lib/utils';
import dayjs from 'dayjs';
import { ArchiveIcon, CalendarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const WysiwygNoSSR = dynamic(
  () =>
    import(
      '@/app/(dashboard)/posts/[postId]/_components/wysiwyg/wysiwyg-editor'
    ),
  { ssr: false }
);

export default async function DetailPostPage({ params }: any) {
  const { slug } = params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <section className="flex flex-col items-start justify-between">
        <div className="relative w-full">
          <Image
            src={post.image!}
            alt={post.title!}
            width={512}
            height={288}
            className="h-[288px] w-full rounded-2xl bg-gray-100 object-cover"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(512, 288)
            )}`}
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="w-full">
          <p className="my-5 overflow-hidden text-xl font-semibold leading-6 text-gray-900">
            {post.title}
          </p>

          {/* Mobile view */}
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-md border border-gray-100 px-3 py-2.5 text-gray-500 sm:hidden">
            {/* Author */}
            <div className="inline-flex items-start justify-start">
              <Image
                src={post.author.image!}
                height={24}
                width={24}
                alt={post.author.name || 'Avatar'}
                className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm"
                priority
                placeholder="blur"
                blurDataURL={shimmer(24, 24)}
              />
              <div className="ml-2 flex flex-col">
                <span className="text-md flex font-semibold text-gray-900">
                  {post.author.name}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="inline-flex space-x-2 border-gray-400 border-opacity-50">
              <p className="mt-0.5">
                <span className="sr-only">Date</span>
                <CalendarIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </p>
              <span className="text-sm">
                {dayjs(post.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
            {/* Category */}
            <div className="inline-flex space-x-2 border-gray-400 border-opacity-50">
              <p className="mt-0.5">
                <span className="sr-only">Category</span>
                <ArchiveIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </p>
              <span className="text-sm">{post.category?.title}</span>
            </div>
          </div>

          {/* Desktop view */}
          <div className="mb-7 hidden justify-start text-gray-500 sm:flex sm:flex-row">
            {/* Author */}
            <div className="mb-5 flex flex-row items-start justify-start pr-3.5 md:mb-0">
              <Image
                src={post.author.image!}
                height={24}
                width={24}
                alt={post.author.name || 'Avatar'}
                className="flex h-[24px] w-[24px] rounded-full object-cover shadow-sm"
                priority
                placeholder="blur"
                blurDataURL={shimmer(24, 24)}
              />
              <div className="ml-2 flex flex-col">
                <span className="text-md flex font-semibold text-gray-900">
                  {post.author.name}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center">
              {/* Date */}
              <div className="flex space-x-2 border-gray-400 border-opacity-50 pl-0 pr-3.5 md:border-l md:pl-3.5">
                <p className="mt-0.5">
                  <span className="sr-only">Date</span>
                  <CalendarIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </p>
                <span className="text-sm">
                  {dayjs(post.createdAt).format('MM/DD/YYYY')}
                </span>
              </div>
              {/* Category */}
              <div className="flex space-x-2 border-l border-gray-400 border-opacity-50 pl-3.5 pr-3.5">
                <p className="mt-0.5">
                  <span className="sr-only">Category</span>
                  <ArchiveIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </p>
                <span className="text-sm">{post.category?.title}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative border-slate-500/50 py-5">
        <WysiwygNoSSR
          defaultValue={JSON.parse(post.content!)}
          editable={false}
        />
      </div>
    </div>
  );
}
