import { create } from 'zustand';

type LoadingDialog = {
  showLoadingDialog: boolean;
  setLoadingDialog: (loading: boolean) => void;
};

export const useLoadingDialog = create<LoadingDialog>((set) => ({
  showLoadingDialog: false,
  setLoadingDialog: (loading: boolean) => set({ showLoadingDialog: loading }),
}));
