"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { type Plan, planById } from "@/app/(web)/pricing/_components/data";
import { Italic } from "@/components/home/primitives";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  LoaderIcon,
} from "@/components/icons";
import { useContactQuerySubmit } from "@/lib/react-query/hooks/use-contact-queries";
import { cn } from "@/lib/utils";
import {
  type ContactQuerySchemaValues,
  contactQuerySchema,
} from "@/lib/validation/zod/contact-query.schema";
import { FORM } from "./data";

const EMPTY: ContactQuerySchemaValues = { name: "", email: "", message: "" };

export function ContactForm({ className }: { className?: string }) {
  const headingId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [plan, setPlan] = useState<Plan>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactQuerySchemaValues>({
    resolver: zodResolver(contactQuerySchema),
    defaultValues: EMPTY,
  });

  const { mutate, isPending, error } = useContactQuerySubmit();

  // Arriving from a plan on /pricing: name the plan in the message.
  useEffect(() => {
    const chosen = planById(
      new URLSearchParams(window.location.search).get("plan"),
    );
    if (!chosen) return;
    setPlan(chosen);
    setValue(
      "message",
      `I'm interested in the ${chosen.name} plan (${chosen.price}${chosen.unit}). `,
    );
  }, [setValue]);

  const onSubmit = handleSubmit((values) => {
    mutate(values, {
      onSuccess: () => {
        setSentTo(values.email);
        reset(EMPTY);
      },
    });
  });

  const field =
    "w-full rounded-[14px] border border-neutral-200 bg-white px-4 py-3 text-[15px] text-heading outline-none transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-primary focus:ring-4 focus:ring-primary/15 aria-invalid:border-red-400";
  const label = "mb-1.5 block text-[13.5px] font-semibold text-heading";
  const errorText = "mt-1.5 block text-[12.5px] text-red-600";

  return (
    <section
      id="query"
      aria-labelledby={headingId}
      className={cn(
        "scroll-mt-28 rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(30,20,10,0.45)] md:p-8",
        className,
      )}
    >
      <p className="text-[13px] font-medium text-neutral-500">{FORM.eyebrow}</p>
      <h2
        id={headingId}
        className="mt-1 font-display text-[28px] leading-[1.05] font-bold tracking-[-0.035em] text-heading md:text-[32px]"
      >
        {FORM.title} <Italic>{FORM.accent}</Italic>
      </h2>

      {plan && !sentTo ? (
        <p className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-[14px] bg-primary/[0.07] px-4 py-3 text-[14px] text-heading ring-1 ring-primary/15">
          <span>
            Plan: <span className="font-semibold">{plan.name}</span>{" "}
            <span className="text-neutral-500">
              {plan.price}
              {plan.unit}
            </span>
          </span>
          <Link
            href="/pricing"
            className="text-[13px] font-semibold text-brand-deep hover:underline"
          >
            Change
          </Link>
        </p>
      ) : null}

      {sentTo ? (
        <div
          aria-live="polite"
          className="mt-6 rounded-[20px] border border-primary/20 bg-primary/5 p-6"
        >
          <CheckCircleIcon aria-hidden className="size-8 text-primary" />
          <p className="mt-3 font-display text-[20px] font-bold tracking-[-0.02em] text-heading">
            Thanks — your message is on its way.
          </p>
          <p className="mt-1.5 text-[15px] leading-[1.6] text-neutral-600">
            We&rsquo;ll reply to{" "}
            <span className="font-medium text-heading">{sentTo}</span>.
          </p>
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="mt-5 text-[14px] font-semibold text-brand-deep underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={nameId} className={label}>
                Name
              </label>
              <input
                id={nameId}
                type="text"
                autoComplete="name"
                placeholder="Your name"
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
              <label htmlFor={emailId} className={label}>
                Email
              </label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? `${emailId}-error` : undefined}
                className={field}
                {...register("email")}
              />
              {errors.email ? (
                <span
                  id={`${emailId}-error`}
                  role="alert"
                  className={errorText}
                >
                  {errors.email.message}
                </span>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor={messageId} className={label}>
              Message
            </label>
            <textarea
              id={messageId}
              rows={6}
              placeholder="Tell us about your business and what you need help with"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? `${messageId}-error` : undefined
              }
              className={cn(field, "resize-y")}
              {...register("message")}
            />
            {errors.message ? (
              <span
                id={`${messageId}-error`}
                role="alert"
                className={errorText}
              >
                {errors.message.message}
              </span>
            ) : null}
          </div>

          {error ? (
            <p role="alert" className="text-[14px] text-red-600">
              {error.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="group inline-flex w-full rounded-full bg-primary/20 p-1.25 transition-colors duration-300 hover:bg-primary/30 disabled:opacity-70 sm:w-auto sm:justify-self-start"
          >
            <span className="flex w-full items-center justify-center gap-2.5 rounded-full bg-linear-to-br from-primary to-brand-deep py-3.5 pr-3.5 pl-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
              <span className="font-display text-[16px] leading-none font-semibold tracking-[-0.01em] text-white">
                {isPending ? "Sending" : "Send message"}
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-white/20">
                {isPending ? (
                  <LoaderIcon
                    aria-hidden
                    className="size-3.5 animate-spin text-white"
                  />
                ) : (
                  <ArrowRightIcon
                    aria-hidden
                    className="size-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                )}
              </span>
            </span>
          </button>
        </form>
      )}
    </section>
  );
}
