'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { LoadingDialog } from './loading-alert';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors />
        <LoadingDialog />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};
