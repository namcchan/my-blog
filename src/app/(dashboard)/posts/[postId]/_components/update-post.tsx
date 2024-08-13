'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, SparklesIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'react-slugify';
import WysiwygEditor from './wysiwyg/wysiwyg-editor';
import { Category, Post } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import _ from 'lodash';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { createUploadUrl, updatePost } from '@/actions/post';
import { useLoadingDialog } from '@/hooks/useLoading';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updatePostSchema, UpdatePostSchema } from '@/hooks/update-post';

export type UpdatePostProps = {
  post: Post;
  categories: Category[];
};

const UpdatePost = ({ post, categories }: UpdatePostProps) => {
  const router = useRouter();
  const { setLoadingDialog } = useLoadingDialog();
  const [image, setImage] = useState<File | null>(null);
  const form = useForm<UpdatePostSchema>({
    defaultValues: {
      title: post.title ?? '',
      description: post.description ?? '',
      content: post.content ?? '',
      slug: post.slug ?? `post-${uuid()}`,
      image: post.image ?? '',
      categoryId: post?.categoryId ?? '',
    },
    resolver: zodResolver(updatePostSchema),
  });

  const onSubmit = async (data: UpdatePostSchema) => {
    setLoadingDialog(true);
    try {
      if (image) {
        const { url, publicUrl } = await createUploadUrl(
          image.name,
          image.type
        );
        data.image = publicUrl;
        await fetch(url, {
          method: 'PUT',
          body: image,
          headers: {
            'Content-Type': image.type,
          },
        });
      }
      await updatePost(post.id, data);
      router.refresh();
      toast.success('Post updated successfully');
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      setLoadingDialog(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container px-4 lg:px-8 max-w-5xl flex flex-col justify-start items-start py-8 h-full flex-1"
      >
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft /> Back
        </Button>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
            <CardDescription>
              Fill out the form to publish a new blog post.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="w-full max-w-md">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full max-w-md">
                  <FormLabel>
                    Title <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="w-full max-w-md">
                  <FormLabel>
                    Slug <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        field.onChange(slugify(form.getValues('title')))
                      }
                    >
                      <SparklesIcon className="mr-2 h-4 w-4" />
                      Generate slug
                    </Button>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full max-w-md">
                  <FormLabel>
                    Cover image
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Enter short description"
                      onChange={(e) => {
                        setImage(e.target.files?.[0]!);
                        field.onChange(
                          URL.createObjectURL(e.target.files?.[0]!)
                        );
                      }}
                    />
                  </FormControl>

                  <FormDescription>
                    {field.value && (
                      <Image
                        width={100}
                        height={1}
                        src={field.value}
                        className="w-20 object-cover rounded-md"
                        alt={''}
                      />
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Short Description
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter short description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Content <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <WysiwygEditor
                      editable
                      defaultValue={field.value ? JSON.parse(field.value) : ''}
                      onDebouncedUpdate={(editor) => {
                        field.onChange(JSON.stringify(editor?.getJSON()));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => router.replace('/posts')}
              >
                Cancel
              </Button>
              <Button disabled={!form.formState.isDirty} type="submit">
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default UpdatePost;
