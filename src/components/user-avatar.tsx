import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserAvatar({ user }: any) {
  return (
    <Avatar>
      <AvatarImage src={user.image} alt={user.name} />
      <AvatarFallback>{user.name?.substring(0, 2)}</AvatarFallback>
    </Avatar>
  );
}
