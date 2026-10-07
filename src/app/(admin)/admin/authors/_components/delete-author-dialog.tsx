"use client";

import { useState } from "react";
import { LoaderIcon, TrashIcon, WarningIcon } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAuthorDelete } from "@/lib/react-query/hooks/use-authors";

const DeleteAuthorDialog = ({
  id,
  name,
  posts,
}: {
  id: string;
  name: string;
  posts: number;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate: removeAuthor, isPending } = useAuthorDelete();

  function onConfirm() {
    removeAuthor(id, {
      onSuccess: () => {
        toast.add({ title: "Author deleted successfully" });
        setOpen(false);
      },
      onError: (err) => {
        toast.add({ title: err?.message || "Failed to delete author" });
      },
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${name}`}
            className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          />
        }
      >
        <TrashIcon />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <WarningIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete this author?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-foreground">{name}</span> will be
            permanently removed.
            {posts > 0
              ? ` Their ${posts} ${posts === 1 ? "post" : "posts"} will stay published without an author.`
              : ""}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isPending}
            className="bg-destructive text-background hover:bg-destructive/90"
          >
            {isPending ? (
              <>
                <LoaderIcon className="animate-spin" />
                Deleting
              </>
            ) : (
              "Delete author"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAuthorDialog;
