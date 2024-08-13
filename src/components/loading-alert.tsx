import { Loader2Icon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useLoadingDialog } from '@/hooks/useLoading';

export const LoadingDialog = () => {
  const { showLoadingDialog, setLoadingDialog } = useLoadingDialog();

  return (
    <AlertDialog open={showLoadingDialog} onOpenChange={setLoadingDialog}>
      <AlertDialogContent className="font-sans">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            please wait...
          </AlertDialogTitle>
          <AlertDialogDescription className="mx-auto text-center">
            <Loader2Icon className="h-6 w-6 animate-spin" />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
