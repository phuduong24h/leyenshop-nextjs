import { cn } from 'utils';

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('h-3 w-full animate-pulse rounded-md bg-background-primary', className)} {...props} />;
};

export default Skeleton;
