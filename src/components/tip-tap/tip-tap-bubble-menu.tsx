"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { useState } from "react";
import {
  BoldIcon,
  CodeIcon,
  HighlighterIcon,
  ItalicIcon,
  LinkIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UnlinkIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EditorBubbleMenu({ editor }: { editor: Editor }) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [url, setUrl] = useState("");

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      underline: editor.isActive("underline"),
      strike: editor.isActive("strike"),
      code: editor.isActive("code"),
      highlight: editor.isActive("highlight"),
      link: editor.isActive("link"),
      href: (editor.getAttributes("link").href as string) ?? "",
    }),
  });

  const chain = () => editor.chain().focus();

  function applyLink() {
    const value = url.trim();
    if (value) {
      chain()
        .extendMarkRange("link")
        .setLink({ href: value, rel: "noopener noreferrer" })
        .run();
    }
    setLinkOpen(false);
    setUrl("");
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor, state }) => {
        const { from, to, empty } = state.selection;
        if (empty || from === to) return false;
        return (
          editor.isActive("paragraph") ||
          editor.isActive("heading") ||
          editor.isActive("listItem") ||
          editor.isActive("blockquote") ||
          editor.isActive("tableCell") ||
          editor.isActive("tableHeader")
        );
      }}
      options={{ placement: "top", offset: 8 }}
    >
      <div className="flex items-center gap-0.5 rounded-md border border-border bg-popover p-1 shadow-md">
        {linkOpen ? (
          <form
            className="flex items-center gap-1"
            onSubmit={(event) => {
              event.preventDefault();
              applyLink();
            }}
          >
            <Input
              autoFocus
              value={url}
              placeholder="https://"
              aria-label="Link URL"
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setLinkOpen(false);
              }}
              className="h-7 w-56 text-xs"
            />
            <Button type="submit" size="xs">
              Apply
            </Button>
            <Button
              type="button"
              size="xs"
              variant="ghost"
              onClick={() => setLinkOpen(false)}
            >
              Cancel
            </Button>
          </form>
        ) : (
          <>
            <Mark
              active={state.bold}
              label="Bold"
              onClick={() => chain().toggleBold().run()}
            >
              <BoldIcon />
            </Mark>
            <Mark
              active={state.italic}
              label="Italic"
              onClick={() => chain().toggleItalic().run()}
            >
              <ItalicIcon />
            </Mark>
            <Mark
              active={state.underline}
              label="Underline"
              onClick={() => chain().toggleUnderline().run()}
            >
              <UnderlineIcon />
            </Mark>
            <Mark
              active={state.strike}
              label="Strikethrough"
              onClick={() => chain().toggleStrike().run()}
            >
              <StrikethroughIcon />
            </Mark>
            <Mark
              active={state.highlight}
              label="Highlight"
              onClick={() => chain().toggleHighlight().run()}
            >
              <HighlighterIcon />
            </Mark>
            <Mark
              active={state.code}
              label="Inline code"
              onClick={() => chain().toggleCode().run()}
            >
              <CodeIcon />
            </Mark>
            <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />
            <Mark
              active={state.link}
              label={state.link ? "Edit link" : "Add link"}
              onClick={() => {
                setUrl(state.href);
                setLinkOpen(true);
              }}
            >
              <LinkIcon />
            </Mark>
            {state.link ? (
              <Mark
                active={false}
                label="Remove link"
                onClick={() =>
                  chain().extendMarkRange("link").unsetLink().run()
                }
              >
                <UnlinkIcon />
              </Mark>
            ) : null}
          </>
        )}
      </div>
    </BubbleMenu>
  );
}

function Mark({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant={active ? "default" : "ghost"}
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={onClick}
      className="[&_svg]:size-4"
    >
      {children}
    </Button>
  );
}
