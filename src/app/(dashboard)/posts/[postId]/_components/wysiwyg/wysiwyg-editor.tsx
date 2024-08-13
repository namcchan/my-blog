'use client';

import '@/styles/editor.css';
import '@/styles/prosemirror.css';
import { Editor as EditorClass } from '@tiptap/core';
import { EditorProps } from '@tiptap/pm/view';
import {
  EditorContent,
  Extension,
  JSONContent,
  useEditor,
} from '@tiptap/react';
import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EditorBubbleMenu } from './bubble-menu';
import { defaultEditorContent } from './default-content';
import { defaultExtensions } from './extensions';
import { ImageResizer } from './extensions/image-resizer';
import { defaultEditorProps } from './props';

export default function WysiwygEditor({
  className = 'relative w-full focus:ring-orange-600 focus:outline-8 max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)]',
  defaultValue = defaultEditorContent,
  onDebouncedUpdate = () => {},
  debounceDuration = 500,
  onUpdate = () => {},
  extensions = [],
  editorProps = {},
  editable = true,
}: {
  className?: string;
  defaultValue?: JSONContent | string;
  extensions?: Extension[];
  editorProps?: EditorProps;
  onUpdate?: (editor?: EditorClass) => void | Promise<void>;
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
  debounceDuration?: number;
  editable?: boolean;
}) {
  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    onDebouncedUpdate(editor);
  }, debounceDuration);

  if (!editable) {
    editorProps.editable = () => false;
  }

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
