"use client";

import { type Editor, useEditorState } from "@tiptap/react";
import { type ReactNode, useRef, useState } from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BulletListIcon,
  ChevronDownIcon,
  CodeIcon,
  ColorIcon,
  EraserIcon,
  HeadingIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  MinusIcon,
  OrderedListIcon,
  QuoteIcon,
  RedoIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TableIcon,
  TaskListIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
  UploadIcon,
  YoutubeIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { acceptedTypes } from "@/lib/utils";

const NOFOLLOW_REL = "noopener noreferrer nofollow";
const DOFOLLOW_REL = "noopener noreferrer";

const TEXT_COLORS = [
  { label: "Default", value: null },
  { label: "Teal", value: "#0f766e" },
  { label: "Blue", value: "#1d4ed8" },
  { label: "Purple", value: "#7e22ce" },
  { label: "Red", value: "#b91c1c" },
  { label: "Orange", value: "#c2410c" },
  { label: "Green", value: "#15803d" },
  { label: "Gray", value: "#6b7280" },
] as const;

type ToolButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

const ToolButton = ({
  label,
  active,
  disabled,
  onClick,
  children,
}: ToolButtonProps) => (
  <Button
    type="button"
    size="icon-sm"
    variant={active ? "default" : "ghost"}
    aria-label={label}
    aria-pressed={active}
    title={label}
    disabled={disabled}
    onClick={onClick}
    className="[&_svg]:size-4"
  >
    {children}
  </Button>
);

const Divider = () => <span aria-hidden className="mx-1 h-5 w-px bg-border" />;

const LinkPopover = ({
  isActive,
  currentHref,
  currentRel,
  onSubmit,
}: {
  isActive: boolean;
  currentHref: string;
  currentRel: string;
  onSubmit: (href: string, rel: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [rel, setRel] = useState(DOFOLLOW_REL);

  function onOpenChange(next: boolean) {
    if (next) {
      setUrl(currentHref);
      setRel(currentRel.includes("nofollow") ? NOFOLLOW_REL : DOFOLLOW_REL);
    }
    setOpen(next);
  }

  function apply() {
    const value = url.trim();
    if (!value) return;

    onSubmit(value, rel);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        render={
          <Button
            variant={isActive ? "default" : "ghost"}
            type="button"
            size="icon-sm"
            aria-label={isActive ? "Edit link" : "Add link"}
            title={isActive ? "Edit link" : "Add link"}
            className="[&_svg]:size-4"
          />
        }
      >
        <LinkIcon />
      </PopoverTrigger>

      <PopoverContent className="w-72">
        <label
          className="text-xs font-medium text-muted-foreground"
          htmlFor="tiptap-link-url"
        >
          URL
        </label>
        <Input
          id="tiptap-link-url"
          value={url}
          autoFocus
          placeholder="https://example.com"
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              apply();
            }
          }}
        />

        <label
          className="text-xs font-medium text-muted-foreground"
          htmlFor="tiptap-link-rel"
        >
          Link type
        </label>
        <select
          id="tiptap-link-rel"
          value={rel}
          onChange={(event) => setRel(event.target.value)}
          className="h-9 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground"
        >
          <option value={DOFOLLOW_REL}>Dofollow (default)</option>
          <option value={NOFOLLOW_REL}>Nofollow</option>
        </select>
        <p className="text-[11px] text-muted-foreground">
          Links are dofollow by default. Choose nofollow for sponsored,
          user-submitted or otherwise untrusted destinations.
        </p>

        <Button type="button" size="sm" onClick={apply} disabled={!url.trim()}>
          {isActive ? "Update link" : "Add link"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const UrlPopover = ({
  icon,
  label,
  placeholder,
  actionLabel,
  onSubmit,
}: {
  icon: ReactNode;
  label: string;
  placeholder: string;
  actionLabel: string;
  onSubmit: (url: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  function apply() {
    const value = url.trim();
    if (!value) return;

    onSubmit(value);
    setUrl("");
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            type="button"
            size="icon-sm"
            aria-label={label}
            title={label}
            className="[&_svg]:size-4"
          />
        }
      >
        {icon}
      </PopoverTrigger>

      <PopoverContent className="w-72">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <Input
          value={url}
          autoFocus
          placeholder={placeholder}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              apply();
            }
          }}
        />
        <Button type="button" size="sm" onClick={apply} disabled={!url.trim()}>
          {actionLabel}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const TablePopover = ({
  onPick,
}: {
  onPick: (rows: number, cols: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState({ rows: 0, cols: 0 });
  const size = 8;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            type="button"
            size="icon-sm"
            aria-label="Insert table"
            title="Insert table"
            className="[&_svg]:size-4"
          />
        }
      >
        <TableIcon />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-3">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Insert table
        </p>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: mouse-leave only resets the hover preview; each cell is a real button */}
        <div
          className="grid gap-0.5"
          style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          onMouseLeave={() => setHover({ rows: 0, cols: 0 })}
        >
          {Array.from({ length: size * size }, (_, index) => {
            const row = Math.floor(index / size) + 1;
            const col = (index % size) + 1;
            const lit = row <= hover.rows && col <= hover.cols;
            return (
              <button
                key={`${row}-${col}`}
                type="button"
                aria-label={`${row} by ${col} table`}
                onMouseEnter={() => setHover({ rows: row, cols: col })}
                onClick={() => {
                  onPick(row, col);
                  setOpen(false);
                }}
                className={`size-5 rounded-sm border ${
                  lit
                    ? "border-primary bg-primary/30"
                    : "border-border bg-muted/40"
                }`}
              />
            );
          })}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {hover.rows > 0
            ? `${hover.rows} × ${hover.cols}`
            : "Hover to choose a size"}
        </p>
      </PopoverContent>
    </Popover>
  );
};

const TipTapMenuBar = ({
  editor,
  onUploadImages,
  uploading,
}: {
  editor: Editor;
  onUploadImages: (files: FileList | null) => void;
  uploading: boolean;
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isUnderline: editor.isActive("underline"),
      isStrike: editor.isActive("strike"),
      isHighlight: editor.isActive("highlight"),
      isSubscript: editor.isActive("subscript"),
      isSuperscript: editor.isActive("superscript"),
      isCode: editor.isActive("code"),
      color: (editor.getAttributes("textStyle").color as string) ?? null,
      isLink: editor.isActive("link"),
      linkHref: (editor.getAttributes("link").href as string) ?? "",
      linkRel: (editor.getAttributes("link").rel as string) ?? "",
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
      isTaskList: editor.isActive("taskList"),
      isBlockquote: editor.isActive("blockquote"),
      isCodeBlock: editor.isActive("codeBlock"),
      isTable: editor.isActive("table"),
      alignment: (["left", "center", "right", "justify"] as const).find(
        (value) => editor.isActive({ textAlign: value }),
      ),
      headingLevel: ([1, 2, 3, 4, 5, 6] as const).find((level) =>
        editor.isActive("heading", { level }),
      ),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  const chain = () => editor.chain().focus();

  return (
    <div className="flex flex-wrap items-center gap-0.5">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
              aria-label="Text style"
            />
          }
        >
          <HeadingIcon className="size-4" />
          {state.headingLevel ? `Heading ${state.headingLevel}` : "Paragraph"}
          <ChevronDownIcon className="size-3.5 opacity-60" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <DropdownMenuItem onClick={() => chain().setParagraph().run()}>
            Paragraph
          </DropdownMenuItem>
          {([1, 2, 3, 4] as const).map((level) => (
            <DropdownMenuItem
              key={level}
              onClick={() => chain().toggleHeading({ level }).run()}
              className={
                level === 1
                  ? "text-lg font-semibold"
                  : level === 2
                    ? "text-base font-semibold"
                    : "font-medium"
              }
            >
              Heading {level}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => chain().toggleCodeBlock().run()}>
            CodeIcon block
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => chain().toggleBlockquote().run()}>
            QuoteIcon
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Divider />

      <ToolButton
        label="BoldIcon"
        active={state.isBold}
        onClick={() => chain().toggleBold().run()}
      >
        <BoldIcon />
      </ToolButton>
      <ToolButton
        label="ItalicIcon"
        active={state.isItalic}
        onClick={() => chain().toggleItalic().run()}
      >
        <ItalicIcon />
      </ToolButton>
      <ToolButton
        label="UnderlineIcon"
        active={state.isUnderline}
        onClick={() => chain().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </ToolButton>
      <ToolButton
        label="StrikethroughIcon"
        active={state.isStrike}
        onClick={() => chain().toggleStrike().run()}
      >
        <StrikethroughIcon />
      </ToolButton>
      <ToolButton
        label="Highlight"
        active={state.isHighlight}
        onClick={() => chain().toggleHighlight().run()}
      >
        <HighlighterIcon />
      </ToolButton>
      <ToolButton
        label="Inline code"
        active={state.isCode}
        onClick={() => chain().toggleCode().run()}
      >
        <CodeIcon />
      </ToolButton>
      <ToolButton
        label="Subscript"
        active={state.isSubscript}
        onClick={() => chain().toggleSubscript().run()}
      >
        <SubscriptIcon />
      </ToolButton>
      <ToolButton
        label="Superscript"
        active={state.isSuperscript}
        onClick={() => chain().toggleSuperscript().run()}
      >
        <SuperscriptIcon />
      </ToolButton>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Text color"
              title="Text color"
              className="relative [&_svg]:size-4"
            />
          }
        >
          <ColorIcon />
          <span
            aria-hidden
            className="absolute right-1 bottom-0.5 left-1 h-1 rounded-full"
            style={{ backgroundColor: state.color ?? "currentColor" }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Text color</DropdownMenuLabel>
            {TEXT_COLORS.map((color) => (
              <DropdownMenuItem
                key={color.label}
                onClick={() =>
                  color.value
                    ? chain().setColor(color.value).run()
                    : chain().unsetColor().run()
                }
              >
                <span
                  aria-hidden
                  className="size-3.5 rounded-full border border-border"
                  style={{ backgroundColor: color.value ?? "transparent" }}
                />
                {color.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ToolButton
        label="Clear formatting"
        onClick={() => chain().unsetAllMarks().clearNodes().run()}
      >
        <EraserIcon />
      </ToolButton>

      <Divider />

      <ToolButton
        label="Align left"
        active={state.alignment === "left"}
        onClick={() => chain().setTextAlign("left").run()}
      >
        <AlignLeftIcon />
      </ToolButton>
      <ToolButton
        label="Align center"
        active={state.alignment === "center"}
        onClick={() => chain().setTextAlign("center").run()}
      >
        <AlignCenterIcon />
      </ToolButton>
      <ToolButton
        label="Align right"
        active={state.alignment === "right"}
        onClick={() => chain().setTextAlign("right").run()}
      >
        <AlignRightIcon />
      </ToolButton>
      <ToolButton
        label="Justify"
        active={state.alignment === "justify"}
        onClick={() => chain().setTextAlign("justify").run()}
      >
        <AlignJustifyIcon />
      </ToolButton>

      <Divider />

      <ToolButton
        label="Bullet list"
        active={state.isBulletList}
        onClick={() => chain().toggleBulletList().run()}
      >
        <BulletListIcon />
      </ToolButton>
      <ToolButton
        label="Numbered list"
        active={state.isOrderedList}
        onClick={() => chain().toggleOrderedList().run()}
      >
        <OrderedListIcon />
      </ToolButton>
      <ToolButton
        label="Task list"
        active={state.isTaskList}
        onClick={() => chain().toggleTaskList().run()}
      >
        <TaskListIcon />
      </ToolButton>
      <ToolButton
        label="QuoteIcon"
        active={state.isBlockquote}
        onClick={() => chain().toggleBlockquote().run()}
      >
        <QuoteIcon />
      </ToolButton>
      <ToolButton
        label="Horizontal rule"
        onClick={() => chain().setHorizontalRule().run()}
      >
        <MinusIcon />
      </ToolButton>

      <Divider />

      {state.isTable ? (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="default"
                size="icon-sm"
                aria-label="Table"
                title="Table"
                className="[&_svg]:size-4"
              />
            }
          >
            <TableIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Rows</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => chain().addRowBefore().run()}>
                Add row above
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => chain().addRowAfter().run()}>
                Add row below
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => chain().deleteRow().run()}>
                Delete row
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Columns</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => chain().addColumnBefore().run()}>
                Add column left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => chain().addColumnAfter().run()}>
                Add column right
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => chain().deleteColumn().run()}>
                Delete column
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Cells</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => chain().toggleHeaderRow().run()}>
                Toggle header row
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => chain().toggleHeaderColumn().run()}
              >
                Toggle header column
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => chain().mergeOrSplit().run()}>
                Merge or split cells
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => chain().deleteTable().run()}
            >
              Delete table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <TablePopover
          onPick={(rows, cols) =>
            chain().insertTable({ rows, cols, withHeaderRow: true }).run()
          }
        />
      )}

      <Divider />

      <LinkPopover
        isActive={state.isLink}
        currentHref={state.linkHref}
        currentRel={state.linkRel}
        onSubmit={(href, rel) =>
          chain().extendMarkRange("link").setLink({ href, rel }).run()
        }
      />
      {state.isLink ? (
        <ToolButton
          label="Remove link"
          onClick={() => chain().extendMarkRange("link").unsetLink().run()}
        >
          <UnlinkIcon />
        </ToolButton>
      ) : null}

      <input
        ref={fileInput}
        type="file"
        accept={acceptedTypes.join(",")}
        multiple
        hidden
        onChange={(event) => {
          onUploadImages(event.target.files);
          event.target.value = "";
        }}
      />
      <ToolButton
        label={uploading ? "Uploading…" : "Upload image"}
        disabled={uploading}
        onClick={() => fileInput.current?.click()}
      >
        <UploadIcon />
      </ToolButton>
      <UrlPopover
        icon={<ImageIcon />}
        label="Image from URL"
        placeholder="https://example.com/photo.jpg"
        actionLabel="Insert image"
        onSubmit={(url) => chain().setImage({ src: url }).run()}
      />
      <UrlPopover
        icon={<YoutubeIcon />}
        label="YouTube URL"
        placeholder="https://youtube.com/watch?v=…"
        actionLabel="Embed video"
        onSubmit={(url) => chain().setYoutubeVideo({ src: url }).run()}
      />

      <Divider />

      <ToolButton
        label="UndoIcon"
        disabled={!state.canUndo}
        onClick={() => chain().undo().run()}
      >
        <UndoIcon />
      </ToolButton>
      <ToolButton
        label="RedoIcon"
        disabled={!state.canRedo}
        onClick={() => chain().redo().run()}
      >
        <RedoIcon />
      </ToolButton>
    </div>
  );
};

export default TipTapMenuBar;
