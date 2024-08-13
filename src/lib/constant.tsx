import {
  Pencil2Icon as DraftIcon,
  CheckCircledIcon as PublishedIcon,
} from '@radix-ui/react-icons';

export const statuses = [
  {
    value: 'published',
    label: 'Published',
    icon: PublishedIcon,
  },
  {
    value: 'draft',
    label: 'Draft',
    icon: DraftIcon,
  },
];
