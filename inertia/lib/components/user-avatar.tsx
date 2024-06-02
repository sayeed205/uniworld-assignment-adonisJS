import { AvatarProps } from '@radix-ui/react-avatar'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Icons } from './icons'

interface UserAvatarProps extends AvatarProps {
  user: any
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const initials = user.name.includes(' ')
    ? user.name.split(' ').map((n: string) => n[0])
    : user.name.slice(0, 2)

  return (
    <Avatar {...props}>
      <AvatarFallback>
        <span className="sr-only">{initials}</span>
        <Icons.user />
      </AvatarFallback>
    </Avatar>
  )
}
