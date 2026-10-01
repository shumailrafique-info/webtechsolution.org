"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { Italic } from "@/components/home/primitives";
import { LoaderIcon } from "@/components/icons";
import { toast } from "@/components/ui/toast";
import { useIdeaSubmit } from "@/lib/react-query/hooks/use-ideas";
import { cn } from "@/lib/utils";
import {
  type IdeaSchemaValues,
  ideaSchema,
} from "@/lib/validation/zod/idea.schema";

export function IdeaBox({
  blogId,
  className,
}: {
  blogId?: string;
  className?: string;
}) {
  const headingId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IdeaSchemaValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues: { name: "", email: "", message: "", blogId },
  });

  const { mutate, isPending } = useIdeaSubmit();

  const onSubmit = handleSubmit((values) => {
    mutate(
      { ...values, blogId },
      {
        onSuccess: () => {
          toast.add({ title: "Thanks - your idea has been sent." });
          reset({ name: "", email: "", message: "", blogId });
        },
        onError: (error: Error) => {
          toast.add({ title: error.message || "Could not send your idea." });
        },
      },
    );
  });

  const field =
    "w-full rounded-[12px] border border-neutral-200 bg-neutral-50/60 px-3.5 py-2.5 text-[14px] text-heading outline-none transition-[border-color,box-shadow,background-color] placeholder:text-neutral-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15";
  const errorText = "mt-1 block text-[12px] text-red-600";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "rounded-[20px] border border-neutral-200 bg-white p-5",
        className,
      )}
    >
      <h2
        id={headingId}
        className="font-display text-[19px] font-bold tracking-tight text-heading"
      >
        Share your <Italic>idea</Italic>
      </h2>
      <p className="mt-1 text-[13.5px] leading-snug text-neutral-500">
        Suggest a topic or tell us what to cover next.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-4 flex flex-col gap-3">
        <div>
          <label htmlFor={nameId} className="sr-only">
            Name
          </label>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            placeholder="Name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className={field}
            {...register("name")}
          />
          {errors.name ? (
            <span id={`${nameId}-error`} role="alert" className={errorText}>
              {errors.name.message}
            </span>
          ) : null}
        </div>

        <div>
          <label htmlFor={emailId} className="sr-only">
            Email
          </label>
          <input
            id={emailId}
            type="email"
            autoComplete="email"
            placeholder="Email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={field}
            {...register("email")}
          />
          {errors.email ? (
            <span id={`${emailId}-error`} role="alert" className={errorText}>
              {errors.email.message}
            </span>
          ) : null}
        </div>

        <div>
          <label htmlFor={messageId} className="sr-only">
            Your idea
          </label>
          <textarea
            id={messageId}
            rows={5}
            placeholder="Place Your Idea"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={cn(field, "resize-y")}
            {...register("message")}
          />
          {errors.message ? (
            <span id={`${messageId}-error`} role="alert" className={errorText}>
              {errors.message.message}
            </span>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-br from-primary to-brand-deep px-4 py-3 font-display text-[15px] font-semibold tracking-[-0.01em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
        >
          {isPending ? (
            <>
              <LoaderIcon aria-hidden className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </section>
  );
}
