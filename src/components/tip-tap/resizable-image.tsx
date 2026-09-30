"use client";

import { mergeAttributes } from "@tiptap/core";
import { Image as BaseImage } from "@tiptap/extension-image";
import {
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  TrashIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Align = "left" | "center" | "right";
type Fit = "cover" | "contain";

const MIN_SIZE = 60;

const RATIOS = [
  { label: "Auto", value: null },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 },
  { label: "3:4", value: 3 / 4 },
] as const;

export function imageStyle(
  width: number | null,
  height: number | null,
  fit: Fit,
) {
  const parts = ["max-width:100%", "height:auto"];
  if (width && height) {
    parts.push(`aspect-ratio:${width}/${height}`, `object-fit:${fit}`);
  }
  return parts.join(";");
}

function parseSize(value: string | null | undefined) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export const ResizableImage = BaseImage.extend({
  inline: false,
  group: "block",
  draggable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) =>
          parseSize(element.getAttribute("width")) ??
          parseSize(element.style.width),
        renderHTML: (attributes) =>
          attributes.width ? { width: attributes.width } : {},
      },
      height: {
        default: null,
        parseHTML: (element) =>
          parseSize(element.getAttribute("height")) ??
          parseSize(element.style.height),
        renderHTML: (attributes) =>
          attributes.height ? { height: attributes.height } : {},
      },
      fit: {
        default: "cover",
        parseHTML: (element) =>
          element.style.objectFit === "contain" ? "contain" : "cover",
        renderHTML: () => ({}),
      },
      align: {
        default: "center",
        parseHTML: (element) =>
          (element.getAttribute("data-align") as Align | null) ?? "center",
        renderHTML: (attributes) => ({ "data-align": attributes.align }),
      },
      description: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("data-description") ??
          element.getAttribute("title"),
        // rendered via <figcaption> in renderHTML instead
        renderHTML: () => ({}),
      },
    };
  },

  parseHTML() {
    return [
      ...(this.parent?.() ?? []),
      {
        tag: "figure",
        priority: 60,
        getAttrs: (element) => {
          const img = element.querySelector("img");
          if (!img) return false;

          const figcaption = element.querySelector("figcaption");
          const description = figcaption?.textContent?.trim() || null;

          return {
            src: img.getAttribute("src") ?? "",
            alt: img.getAttribute("alt"),
            title: img.getAttribute("title"),
            description,
            width:
              parseSize(img.getAttribute("width")) ??
              parseSize(img.style.width),
            height:
              parseSize(img.getAttribute("height")) ??
              parseSize(img.style.height),
            fit: img.style.objectFit === "contain" ? "contain" : "cover",
            align: element.getAttribute("data-align") ?? "center",
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { width, height, fit, align, description } = node.attrs as {
      width: number | null;
      height: number | null;
      fit: Fit;
      align: Align;
      description: string | null;
    };

    const imgAttributes = mergeAttributes(
      this.options.HTMLAttributes,
      HTMLAttributes,
      {
        style: imageStyle(width, height, fit),
        loading: "lazy",
      },
    );

    // No caption -> just render the <img>
    if (!description) {
      return ["img", imgAttributes];
    }

    // With caption -> wrap in <figure> with a centered <figcaption>
    return [
      "figure",
      {
        "data-align": align,
        class: "resizable-image-figure",
      },
      ["img", imgAttributes],
      [
        "figcaption",
        {
          class: "resizable-image-caption",
          style: "text-align:center;",
        },
        description,
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageView);
  },
});

type Drag = { width: number; height: number | null };
type HandleMode = "left" | "right" | "corner";

function ResizableImageView({
  node,
  updateAttributes,
  deleteNode,
  selected,
  editor,
}: NodeViewProps) {
  const { src, alt, description, width, height, fit, align } = node.attrs as {
    src: string;
    alt: string | null;
    description: string | null;
    width: number | null;
    height: number | null;
    fit: Fit;
    align: Align;
  };

  const wrapper = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const [drag, setDrag] = useState<Drag | null>(null);

  function startResize(event: React.PointerEvent, mode: HandleMode) {
    event.preventDefault();
    event.stopPropagation();

    const rect = image.current?.getBoundingClientRect();
    if (!rect) return;

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = rect.width;
    const startHeight = rect.height;
    const maxWidth = wrapper.current?.parentElement?.clientWidth ?? 9999;
    const ratio = height && width ? width / height : startWidth / startHeight;

    function onMove(move: PointerEvent) {
      const dx = move.clientX - startX;
      const dy = move.clientY - startY;

      if (mode === "corner") {
        setDrag({
          width: Math.round(clamp(startWidth + dx, MIN_SIZE, maxWidth)),
          height: Math.round(Math.max(MIN_SIZE, startHeight + dy)),
        });
        return;
      }

      const nextWidth = clamp(
        startWidth + (mode === "right" ? dx : -dx),
        MIN_SIZE,
        maxWidth,
      );
      setDrag({
        width: Math.round(nextWidth),
        height: height ? Math.round(nextWidth / ratio) : null,
      });
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setDrag((current) => {
        if (current) {
          updateAttributes({ width: current.width, height: current.height });
        }
        return null;
      });
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function applyRatio(ratio: number | null) {
    const base =
      width ?? Math.round(image.current?.getBoundingClientRect().width ?? 600);
    updateAttributes({
      width: base,
      height: ratio ? Math.round(base / ratio) : null,
    });
  }

  const shownWidth = drag?.width ?? width;
  const shownHeight = drag ? drag.height : height;
  const editable = editor.isEditable;
  const currentRatio =
    shownWidth && shownHeight ? shownWidth / shownHeight : null;

  return (
    <NodeViewWrapper
      ref={wrapper}
      data-align={align}
      className={cn(
        "relative my-5 flex",
        align === "left" && "justify-start",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
      )}
    >
      <div
        className={cn(
          "group/img relative inline-block max-w-full",
          selected &&
            editable &&
            "rounded-md ring-2 ring-primary ring-offset-2 ring-offset-background",
        )}
        style={{ width: shownWidth ? `${shownWidth}px` : undefined }}
      >
        {/* biome-ignore lint/performance/noImgElement: editor preview of user content */}
        <img
          ref={image}
          src={src}
          alt={alt ?? ""}
          draggable={false}
          data-drag-handle
          className="block w-full max-w-full rounded-md"
          style={{
            height: "auto",
            aspectRatio:
              shownWidth && shownHeight
                ? `${shownWidth} / ${shownHeight}`
                : undefined,
            objectFit: shownWidth && shownHeight ? fit : undefined,
          }}
        />

        {/* Caption – centered under the image */}
        {description ? (
          <div className="mt-2 text-center text-sm leading-snug text-muted-foreground">
            {description}
          </div>
        ) : null}

        {editable ? (
          <>
            <Handle mode="left" onPointerDown={startResize} />
            <Handle mode="right" onPointerDown={startResize} />
            <Handle mode="corner" onPointerDown={startResize} />

            {drag ? (
              <span className="pointer-events-none absolute right-2 bottom-2 rounded bg-ink px-1.5 py-0.5 font-mono text-[11px] text-ink-foreground">
                {drag.width}
                {drag.height ? ` × ${drag.height}` : ""}
              </span>
            ) : null}

            {selected ? (
              <div
                className="absolute -top-12 left-1/2 z-10 flex -translate-x-1/2 flex-wrap items-center gap-1 rounded-md border border-border bg-popover p-1 shadow-md"
                contentEditable={false}
              >
                <Toggle
                  active={align === "left"}
                  label="Align left"
                  onClick={() => updateAttributes({ align: "left" })}
                >
                  <AlignLeftIcon />
                </Toggle>
                <Toggle
                  active={align === "center"}
                  label="Align center"
                  onClick={() => updateAttributes({ align: "center" })}
                >
                  <AlignCenterIcon />
                </Toggle>
                <Toggle
                  active={align === "right"}
                  label="Align right"
                  onClick={() => updateAttributes({ align: "right" })}
                >
                  <AlignRightIcon />
                </Toggle>

                <Separator />

                <SizeField
                  label="Width in pixels"
                  value={shownWidth}
                  onChange={(value) => updateAttributes({ width: value })}
                />
                <span className="text-[11px] text-muted-foreground">×</span>
                <SizeField
                  label="Height in pixels"
                  value={shownHeight}
                  onChange={(value) => updateAttributes({ height: value })}
                />

                <Separator />

                {RATIOS.map((ratio) => (
                  <Toggle
                    key={ratio.label}
                    active={
                      ratio.value === null
                        ? currentRatio === null
                        : currentRatio !== null &&
                          Math.abs(currentRatio - ratio.value) < 0.02
                    }
                    label={`Ratio ${ratio.label}`}
                    onClick={() => applyRatio(ratio.value)}
                    text
                  >
                    {ratio.label}
                  </Toggle>
                ))}

                {shownHeight ? (
                  <>
                    <Separator />
                    <Toggle
                      active={fit === "cover"}
                      label="Crop to fill"
                      onClick={() => updateAttributes({ fit: "cover" })}
                      text
                    >
                      Cover
                    </Toggle>
                    <Toggle
                      active={fit === "contain"}
                      label="Fit inside"
                      onClick={() => updateAttributes({ fit: "contain" })}
                      text
                    >
                      Contain
                    </Toggle>
                  </>
                ) : null}

                <Separator />

                <TextField
                  label="Alt text"
                  placeholder="Alt text"
                  value={alt ?? ""}
                  onCommit={(value) => updateAttributes({ alt: value })}
                />
                <TextField
                  label="Image description"
                  placeholder="Caption"
                  value={description ?? ""}
                  onCommit={(value) =>
                    updateAttributes({ description: value || null })
                  }
                  className="w-40"
                />

                <Separator />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove image"
                  onClick={deleteNode}
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <TrashIcon />
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </NodeViewWrapper>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Separator() {
  return <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />;
}

function SizeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  return (
    <Input
      type="number"
      min={MIN_SIZE}
      value={value ?? ""}
      placeholder="auto"
      aria-label={label}
      onChange={(event) => {
        const parsed = Number.parseInt(event.target.value, 10);
        onChange(Number.isFinite(parsed) && parsed >= MIN_SIZE ? parsed : null);
      }}
      className="h-7 w-18 text-xs"
    />
  );
}

function TextField({
  label,
  placeholder,
  value,
  onCommit,
  className,
}: {
  label: string;
  placeholder: string;
  value: string;
  onCommit: (value: string) => void;
  className?: string;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function commit() {
    onCommit(draft.trim());
  }

  return (
    <Input
      value={draft}
      placeholder={placeholder}
      aria-label={label}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
      }}
      className={cn("h-7 w-32 text-xs", className)}
    />
  );
}

function Handle({
  mode,
  onPointerDown,
}: {
  mode: HandleMode;
  onPointerDown: (event: React.PointerEvent, mode: HandleMode) => void;
}) {
  const label =
    mode === "corner" ? "Resize width and height" : `Resize from the ${mode}`;

  return (
    <button
      type="button"
      aria-label={label}
      contentEditable={false}
      onPointerDown={(event) => onPointerDown(event, mode)}
      className={cn(
        "absolute z-10 rounded-full border border-primary bg-background opacity-0 shadow-sm transition-opacity group-hover/img:opacity-100 hover:bg-primary in-[.ProseMirror-selectednode]:opacity-100",
        mode === "left" &&
          "top-1/2 -left-1.5 h-8 w-2.5 -translate-y-1/2 cursor-ew-resize",
        mode === "right" &&
          "top-1/2 -right-1.5 h-8 w-2.5 -translate-y-1/2 cursor-ew-resize",
        mode === "corner" &&
          "-right-1.5 -bottom-1.5 size-3.5 cursor-nwse-resize",
      )}
    />
  );
}

function Toggle({
  active,
  label,
  onClick,
  text = false,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  text?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant={active ? "default" : "ghost"}
      size={text ? "xs" : "icon-sm"}
      aria-label={label}
      aria-pressed={active}
      title={label}
      onClick={onClick}
      className={text ? "font-mono" : undefined}
    >
      {children}
    </Button>
  );
}
