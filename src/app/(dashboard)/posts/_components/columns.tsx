'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { statuses } from '@/lib/constant';
import { Category, Post } from '@prisma/client';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import _ from 'lodash';
import { MoreHorizontal } from 'lucide-react';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableColumnActions } from './data-table-column-actions';

export const columns: ColumnDef<Post & { category: Category }>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="min-w-[200px] max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'category_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category: Category = _.get(row, 'original.category');

      if (!category) {
        return null;
      }

      return (
        <div className="flex space-x-2">
          <div className="max-w-[500px] justify-start truncate font-medium">
            <span className="inline-flex items-center rounded-full border border-gray-400 px-3 py-1 text-sm text-gray-500">
              {category.title}
            </span>
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <Badge variant={status?.value === 'draft' ? 'outline' : 'secondary'}>
            {status?.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      const date = dayjs(row.getValue('createdAt')).format('MM/DD/YYYY');

      if (!date) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    enableColumnFilter: false,
    enableSorting: false,
    cell: ({ row }) => {
      const post = row.original;

      return <DataTableColumnActions id={post.id} />;
    },
  },
];
