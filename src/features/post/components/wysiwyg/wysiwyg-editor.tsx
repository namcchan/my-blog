'use client';

import '@/styles/prosemirror.css';
import '@/styles/editor.css';
import { Editor as EditorClass } from '@tiptap/core';
import { EditorProps } from '@tiptap/pm/view';
import {
  EditorContent,
  Extension,
  JSONContent,
  useEditor,
} from '@tiptap/react';
import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EditorBubbleMenu } from './bubble-menu';
import { defaultEditorContent } from './default-content';
import { defaultExtensions } from './extensions';
import { ImageResizer } from './extensions/image-resizer';
import { defaultEditorProps } from './props';

export default function WysiwygEditor({
  className = 'relative w-full focus:ring-orange-600 focus:outline-8 max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg',
  defaultValue = defaultEditorContent,
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
  onUpdate = () => {},
  extensions = [],
  editorProps = {},
}: {
  className?: string;
  defaultValue?: JSONContent | string;
  extensions?: Extension[];
  editorProps?: EditorProps;
  onUpdate?: (editor?: EditorClass) => void | Promise<void>;
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
  debounceDuration?: number;
}) {
  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    onDebouncedUpdate(editor);
  }, debounceDuration);

  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],
    editorProps: {
      ...defaultEditorProps,
      ...editorProps,
    },
    immediatelyRender: true,
    onUpdate: (e) => {
      onUpdate(e.editor);
      debouncedUpdates(e);
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (defaultValue) {
      editor.commands.setContent(defaultValue);
    }
  }, [editor, defaultValue]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={className}
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor?.isActive('image') && <ImageResizer editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
