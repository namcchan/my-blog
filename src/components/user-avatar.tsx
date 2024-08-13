import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { forwardRef } from 'react';

export const UserAvatar = forwardRef<any, any>((props, ref) => {
  const user = props.user;
  return (
    <Avatar ref={ref} {...props}>
      <AvatarImage src={user?.image} alt={user?.name} />
      <AvatarFallback>{user.name?.substring(0, 2)}</AvatarFallback>
    </Avatar>
  );
});

UserAvatar.displayName = 'UserAvatar';
