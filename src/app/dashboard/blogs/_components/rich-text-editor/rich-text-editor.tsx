"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import "./editor.css";
import { editorExtensions } from "./extensions";
import { Toolbar } from "./Toolbar";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "rich-editor min-h-[280px] focus:outline-none px-5 py-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const currentContent = editor.getHTML();
    if (value !== currentContent) {
      // ✅ رفع خطای TypeScript: استفاده از شیء options
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-sm border border-gray bg-white shadow-sm">
      <Toolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
