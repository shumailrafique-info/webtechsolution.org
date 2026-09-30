"use client";

import { CharacterCount } from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TableKit } from "@tiptap/extension-table";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Youtube } from "@tiptap/extension-youtube";
import type { EditorView } from "@tiptap/pm/view";
import {
  type Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useCallback, useState } from "react";
import { LoaderIcon } from "@/components/icons";
import { toast } from "@/components/ui/toast";
import { BLOG_PROSE } from "@/lib/blogProse";
import { isAcceptedImage, uploadImageToS3 } from "@/lib/upload-image";
import { ResizableImage } from "./resizable-image";
import { EditorBubbleMenu } from "./tip-tap-bubble-menu";
import TipTapMenuBar from "./tip-tap-tool-bar";

async function insertImages(
  view: EditorView,
  files: File[],
  setBusy: (busy: boolean) => void,
  pos?: number,
) {
  const images = files.filter(isAcceptedImage);
  if (images.length === 0) {
    if (files.length > 0) {
      toast.add({ title: "Only JPG, PNG, WebP and GIF images can be added." });
    }
    return;
  }

  setBusy(true);
  try {
    for (const file of images) {
      const { url } = await uploadImageToS3(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      const node = view.state.schema.nodes.image.create({ src: url, alt });
      const at = pos ?? view.state.selection.to;
      view.dispatch(view.state.tr.insert(at, node).scrollIntoView());
      view.focus();
    }
  } catch (error) {
    toast.add({
      title: error instanceof Error ? error.message : "Image upload failed",
    });
  } finally {
    setBusy(false);
  }
}

const TipTapEditor = ({
  onValueChange,
  content = "",
  placeholder = "Start writing…",
}: {
  onValueChange: (content: string) => void;
  content: string;
  placeholder?: string;
}) => {
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    autofocus: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: { rel: "noopener noreferrer" },
        },
      }),
      Youtube.configure({ inline: false, controls: true }),
      ResizableImage.configure({ allowBase64: false }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: false }),
      Subscript,
      Superscript,
      TaskList,
      TaskItem.configure({ nested: true }),
      TableKit.configure({
        table: { resizable: true, lastColumnResizable: false },
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: { class: `${BLOG_PROSE} min-h-[320px] focus:outline-none` },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []);
        if (files.length === 0) return false;
        event.preventDefault();
        void insertImages(view, files, setUploading);
        return true;
      },
      handleDrop: (view, event, _slice, moved) => {
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (moved || files.length === 0) return false;
        event.preventDefault();
        const coords = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });
        void insertImages(view, files, setUploading, coords?.pos);
        return true;
      },
    },
    content,
    onUpdate: ({ editor }) => {
      onValueChange(editor.getHTML());
    },
  });

  const uploadFromPicker = useCallback(
    (files: FileList | null) => {
      if (!editor || !files) return;
      void insertImages(editor.view, Array.from(files), setUploading);
    },
    [editor],
  );

  return (
    <div className="rounded-xl border border-border">
      {!editor ? (
        <div className="w-full py-8 text-center">
          <span className="text-sm text-muted-foreground">
            Loading editor...
          </span>
        </div>
      ) : (
        <>
          <div className="sticky top-0 z-20 rounded-t-xl border-b border-border bg-muted/80 px-3 py-1.5 backdrop-blur-md">
            <TipTapMenuBar
              editor={editor}
              onUploadImages={uploadFromPicker}
              uploading={uploading}
            />
          </div>

          <div className="relative px-4 py-3 sm:px-6">
            <EditorBubbleMenu editor={editor} />
            <EditorContent editor={editor} />
            {uploading ? (
              <div className="pointer-events-none absolute right-4 bottom-3 flex items-center gap-2 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-muted-foreground shadow-sm">
                <LoaderIcon className="size-3.5 animate-spin" />
                Uploading image…
              </div>
            ) : null}
          </div>

          <EditorFooter editor={editor} />
        </>
      )}
    </div>
  );
};

function EditorFooter({ editor }: { editor: Editor }) {
  const { words, characters } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      words: editor.storage.characterCount.words(),
      characters: editor.storage.characterCount.characters(),
    }),
  });

  return (
    <div className="flex items-center justify-between rounded-b-xl border-t border-border bg-muted/40 px-4 py-1.5 text-[11px] text-muted-foreground">
      <span>
        {words} {words === 1 ? "word" : "words"} · {characters} characters
      </span>
      <span className="hidden sm:inline">
        Paste or drop images to upload them
      </span>
    </div>
  );
}

export default TipTapEditor;
