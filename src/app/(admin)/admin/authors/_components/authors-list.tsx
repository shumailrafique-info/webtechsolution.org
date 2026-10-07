"use client";

import Link from "next/link";
import { PencilIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthors } from "@/lib/react-query/hooks/use-authors";
import { AuthorAvatar } from "./author-avatar";
import DeleteAuthorDialog from "./delete-author-dialog";

const AuthorsList = () => {
  const { data, isPending, isError, error, refetch } = useAuthors();
  const authors = data ?? [];

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-6 py-6 sm:px-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Authors
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPending
              ? "Loading authors…"
              : `${authors.length} ${authors.length === 1 ? "author" : "authors"}`}
          </p>
        </div>

        <Button
          nativeButton={false}
          size="lg"
          render={<Link href="/admin/authors/new" />}
        >
          <PlusIcon />
          New author
        </Button>
      </div>

      <div className="px-6 py-6 sm:px-8">
        {isError ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-12 text-center">
            <p className="text-sm font-medium text-destructive">
              {error?.message || "Could not load authors."}
            </p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : isPending ? (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex items-center gap-4">
                <Skeleton className="size-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        ) : authors.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-16 text-center">
            <p className="text-base font-medium text-foreground">
              No authors yet
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Add an author and choose them on any blog post.
            </p>
            <Button
              size="sm"
              className="mt-2"
              nativeButton={false}
              render={<Link href="/admin/authors/new" />}
            >
              <PlusIcon />
              New author
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Author
                  </th>
                  <th className="hidden px-4 py-3 font-medium text-muted-foreground md:table-cell">
                    Bio
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Posts
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {authors.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border transition-colors last:border-b-0 hover:bg-accent/60"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <AuthorAvatar name={item.name} url={item.image?.url} />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="hidden max-w-md px-4 py-3 text-muted-foreground md:table-cell">
                      <p className="line-clamp-2">{item.bio || "—"}</p>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground tabular-nums">
                      {item.posts}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          nativeButton={false}
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:bg-accent hover:text-primary"
                          render={
                            <Link href={`/admin/authors/edit/${item.id}`} />
                          }
                        >
                          <PencilIcon />
                          Edit
                        </Button>
                        <DeleteAuthorDialog
                          id={item.id}
                          name={item.name}
                          posts={item.posts}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorsList;
