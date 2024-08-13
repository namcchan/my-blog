import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { z } from 'zod';
import { updatePost } from '../actions/actions';

export const updatePostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  categoryId: z.string().min(1),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;

export const useUpdatePost = (
  id: string,
  options?: UseMutationOptions<any, any, UpdatePostSchema>
) => {
  return useMutation({
    ...options,
    mutationFn: (payload) => {
      return updatePost(id, payload);
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
