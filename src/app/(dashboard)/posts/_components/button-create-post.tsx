'use client';

import { createPost } from '@/actions/post';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const ButtonCreatePost = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const { id } = await createPost();
      toast.success('Post created successfully!');
      router.refresh();
      router.push(`/posts/${id}`);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>New Post</Button>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Creating post...
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <Loader2Icon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
