"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoaderIcon, UploadIcon } from "@/components/icons";
import { MultiImageUploader } from "@/components/shared/image-upader";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import type { AuthorType } from "@/drizzle/types";
import {
  useAuthorCreate,
  useAuthorUpdate,
} from "@/lib/react-query/hooks/use-authors";
import {
  type AuthorSchemaValues,
  authorSchema,
} from "@/lib/validation/zod/author.schema";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const AuthorForm = ({ author }: { author: AuthorType | undefined }) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { mutate: createAuthor, isPending } = useAuthorCreate();
  const { mutate: updateAuthor, isPending: isUpdating } = useAuthorUpdate();
  const router = useRouter();
  const form = useForm<AuthorSchemaValues>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      name: author?.name ?? "",
      slug: author?.slug ?? "",
      bio: author?.bio ?? "",
      image: author?.image ? [author.image] : [],
    },
  });

  const busy = isPending || isUpdating || isUploadingImage;

  function onSubmit(data: AuthorSchemaValues) {
    const handlers = {
      onSuccess: () => {
        toast.add({
          title: author
            ? "Author updated successfully"
            : "Author created successfully",
        });
        router.push("/admin/authors");
      },
      onError: (err: Error) => {
        toast.add({ title: err?.message || "Failed to save author" });
      },
    };

    if (author) updateAuthor({ id: author.id, payload: data }, handlers);
    else createAuthor(data, handlers);
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        {author ? "Edit Author" : "Add Author"}
      </h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-3"
      >
        <Controller
          name="image"
          control={form.control}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <Label>Image</Label>
              <MultiImageUploader
                value={field.value ?? []}
                onChange={field.onChange}
                gridClassName="grid-cols-1 gap-3"
                className="w-40!"
                PreviewItemClassName="size-40 overflow-hidden rounded-full!"
                maxFiles={1}
                showLimit={false}
                onUploadingChange={setIsUploadingImage}
                triggerClassName="w-40! cursor-pointer rounded-full! bg-card hover:bg-muted"
              >
                <div className="flex size-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-full border-2 border-dashed border-border bg-card transition-all hover:border-primary hover:bg-muted">
                  <UploadIcon className="size-5 text-muted-foreground" />
                  <div className="text-xs font-medium text-foreground">
                    Image
                  </div>
                </div>
              </MultiImageUploader>
            </div>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>
                Name <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Input
                {...field}
                onChange={(event) => {
                  field.onChange(event);
                  if (!author && !form.getFieldState("slug").isDirty) {
                    form.setValue("slug", toSlug(event.target.value));
                  }
                }}
                placeholder="e.g. Fawad Malik"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>
                Slug <span className="ml-0.5 text-[#6e6e6e]">*</span>
              </FieldLabel>
              <Input
                {...field}
                placeholder="fawad-malik"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <Controller
          name="bio"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-2">
              <FieldLabel>Bio</FieldLabel>
              <Textarea
                {...field}
                rows={5}
                placeholder="A short introduction shown at the end of each post"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError
                  errors={[fieldState.error]}
                  className="mt-1 text-[11px] text-destructive"
                />
              )}
            </Field>
          )}
        />

        <Button type="submit" disabled={busy} className="mt-4 w-full">
          {busy && <LoaderIcon className="mr-2 size-4 animate-spin" />}
          {isUploadingImage
            ? "Uploading Image..."
            : author
              ? isUpdating
                ? "Updating Author..."
                : "Update Author"
              : isPending
                ? "Creating Author..."
                : "Create Author"}
        </Button>
      </form>
    </div>
  );
};

export default AuthorForm;
