'use client';

import { handleLogout } from '@/actions/auth';
import { Session } from 'next-auth';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { UserAvatar } from './user-avatar';

export const UserDropdown = ({ session }: { session: Session | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar user={session?.user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/posts">Posts</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleLogout()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
