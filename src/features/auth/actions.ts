'use server';

import { signIn } from '@/auth';

export const handleSocialSignIn = async (formData: FormData) => {
  const provider = formData.get('provider') as string;
  await signIn(provider, { redirectTo: '/' });
};
