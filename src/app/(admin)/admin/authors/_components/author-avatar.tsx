import { cn } from "@/lib/utils";

export function AuthorAvatar({
  name,
  url,
  className,
}: {
  name: string;
  url?: string | null;
  className?: string;
}) {
  return url ? (
    <img
      src={url}
      alt={name}
      referrerPolicy="no-referrer"
      className={cn("size-10 shrink-0 rounded-full object-cover", className)}
    />
  ) : (
    <span
      aria-hidden
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground",
        className,
      )}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
