'use server';

import { signIn, signOut } from '@/auth';

export const handleSocialSignIn = async (formData: FormData) => {
  const provider = formData.get('provider') as string;
  await signIn(provider, { redirectTo: '/' });
};

export const handleLogout = async () => {
  await signOut({ redirectTo: '/' });
};
