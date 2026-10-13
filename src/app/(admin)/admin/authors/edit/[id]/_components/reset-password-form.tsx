"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LoaderIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useAuthorPasswordReset } from "@/lib/react-query/hooks/use-authors";
import {
  type AuthorPasswordSchemaValues,
  authorPasswordSchema,
} from "@/lib/validation/zod/author.schema";

const ResetPasswordForm = ({ authorId }: { authorId: string }) => {
  const { mutate: resetPassword, isPending } = useAuthorPasswordReset();
  const form = useForm<AuthorPasswordSchemaValues>({
    resolver: zodResolver(authorPasswordSchema),
    defaultValues: { password: "" },
  });

  function onSubmit(data: AuthorPasswordSchemaValues) {
    resetPassword(
      { id: authorId, payload: data },
      {
        onSuccess: () => {
          toast.add({
            title: "Password reset. The author has been signed out everywhere.",
          });
          form.reset({ password: "" });
        },
        onError: (err) => {
          toast.add({ title: err?.message || "Failed to reset password" });
        },
      },
    );
  }

  return (
    <div className="px-8 pb-8">
      <div className="max-w-2xl rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Reset password
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set a new password for this author. They are signed out of every
          device and must use the new password.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start"
        >
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-1 gap-2">
                <FieldLabel className="sr-only">New password</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  autoComplete="new-password"
                  placeholder="New password, at least 8 characters"
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
          <Button type="submit" variant="outline" disabled={isPending}>
            {isPending && <LoaderIcon className="mr-2 size-4 animate-spin" />}
            Reset password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
