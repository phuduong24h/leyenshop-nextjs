import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from 'utils';

interface IDropdownMenu extends RadixDropdownMenu.DropdownMenuProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Dropdown = ({ children, content, ...props }: IDropdownMenu) => {
  return (
    <RadixDropdownMenu.Root {...props}>
      <RadixDropdownMenu.Trigger asChild>{children}</RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Content
        side="bottom"
        align="end"
        className={cn(
          'z-50 mt-2.5 bg-background-primary shadow-xl',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        )}>
        {content}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Root>
  );
};

export default Dropdown;
