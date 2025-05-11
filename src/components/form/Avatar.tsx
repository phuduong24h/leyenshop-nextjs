import Image, { ImageProps } from 'next/image';

import { Icons } from 'assets';
import { cn } from 'utils';

interface IAvatar extends ImageProps {
  defaultAvatar?: string;
}

const Avatar = ({ className, defaultAvatar = Icons.default_avatar, alt = 'avatar', src, ...props }: IAvatar) => {
  return (
    <Image
      src={src || defaultAvatar}
      width={0}
      height={0}
      sizes="100vw"
      className={cn('size-7 rounded-full', className)}
      onError={e => {
        if (defaultAvatar) {
          e.currentTarget.src = defaultAvatar;
        }
      }}
      alt={alt}
      {...props}
    />
  );
};

export default Avatar;
