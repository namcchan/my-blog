import {
  handleDeletePost,
  handleDraftPost,
  handlePublishPost,
} from '@/actions/post';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useLoadingDialog } from '@/hooks/useLoading';
import { Post } from '@prisma/client';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Loader2, MoreHorizontal, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const DataTableColumnActions = ({ post }: { post: Post }) => {
  const router = useRouter();
  const { setLoadingDialog } = useLoadingDialog();

  const { isOpen: showDeleteAlert, onToggle: onDeleteAlert } = useDisclosure();
  const { isOpen: isDeleting, onToggle: onDeleting } = useDisclosure();

  const handleEdit = () => {
    setLoadingDialog(true);
    router.push(`/posts/${post.id}`);
    setLoadingDialog(false);
  };

  const handleDelete = async () => {
    onDeleting();
    try {
      await handleDeletePost(post.id);
      toast.success('Post deleted successfully');
      router.refresh();
      onDeleteAlert();
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      onDeleting();
    }
  };

  const publishPost = async () => {
    setLoadingDialog(true);
    try {
      await handlePublishPost(post.id);
      toast.success('Post published successfully');
      router.refresh();
    } catch (e) {
    } finally {
      setLoadingDialog(false);
    }
  };

  const draftPost = async () => {
    setLoadingDialog(true);
    try {
      await handleDraftPost(post.id);
      toast.success('Post drafted successfully');
      router.refresh();
    } catch (e) {
    } finally {
      setLoadingDialog(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {post.published ? (
            <DropdownMenuItem onClick={draftPost}>Draft</DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={publishPost}>Publish</DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDeleteAlert()}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={onDeleteAlert}>
        <AlertDialogContent className="text-md font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2Icon className="mr-2 h-4 w-4" />
              )}
              <span>Confirm</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
