"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { LoaderIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import type { BlogCategoryType } from "@/drizzle/types";
import {
  useBlogCategoryCreate,
  useBlogCategoryUpdate,
} from "@/lib/react-query/hooks/use-blog-categories";
import {
  type BlogCategorySchemaValues,
  blogCategorySchema,
} from "@/lib/validation/zod/blog-category.schema";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const CategoryForm = ({
  category,
}: {
  category: BlogCategoryType | undefined;
}) => {
  const { mutate: createCategory, isPending } = useBlogCategoryCreate();
  const { mutate: updateCategory, isPending: isUpdating } =
    useBlogCategoryUpdate();
  const router = useRouter();
  const form = useForm<BlogCategorySchemaValues>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
    },
  });

  const busy = isPending || isUpdating;

  function onSubmit(data: BlogCategorySchemaValues) {
    const handlers = {
      onSuccess: () => {
        toast.add({
          title: category
            ? "Category updated successfully"
            : "Category created successfully",
        });
        router.push("/admin/categories");
      },
      onError: (err: Error) => {
        toast.add({ title: err?.message || "Failed to save category" });
      },
    };

    if (category) updateCategory({ id: category.id, payload: data }, handlers);
    else createCategory(data, handlers);
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        {category ? "Edit Category" : "Add Category"}
      </h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-3"
      >
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
                  if (!category && !form.getFieldState("slug").isDirty) {
                    form.setValue("slug", toSlug(event.target.value));
                  }
                }}
                placeholder="e.g. Digital Marketing"
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
                placeholder="digital-marketing"
                aria-invalid={fieldState.invalid}
              />
              <p className="text-xs text-muted-foreground">
                The category page will be at /blog/category/
                {field.value || "slug"}
              </p>
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
          {category
            ? isUpdating
              ? "Updating Category..."
              : "Update Category"
            : isPending
              ? "Creating Category..."
              : "Create Category"}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
