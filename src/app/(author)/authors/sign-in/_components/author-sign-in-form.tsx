"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { LoaderIcon } from "@/components/icons";
import { Brand } from "@/components/layout/brand";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";

const AuthorSignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const { error: signInError } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message || "Could not sign you in.");
      setPending(false);
      return;
    }

    router.replace("/authors");
    router.refresh();
  }

  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16">
      <div className="relative w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Brand />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h1 className="text-center text-xl font-semibold tracking-tight text-foreground">
            Author sign in
          </h1>
          <p className="mt-1.5 text-center text-[13px] text-muted-foreground">
            Use the email and password your editor gave you.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="author-email">Email</FieldLabel>
              <Input
                id="author-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>

            <Field className="gap-2">
              <FieldLabel htmlFor="author-password">Password</FieldLabel>
              <Input
                id="author-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>

            {error ? (
              <p
                role="alert"
                className="rounded-md bg-destructive/10 px-3 py-2 text-[13px] text-destructive"
              >
                {error}
              </p>
            ) : null}

            <Button type="submit" disabled={pending} className="h-11 w-full">
              {pending ? (
                <LoaderIcon className="mr-2 size-4 animate-spin" />
              ) : null}
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            Forgot your password? Ask an admin to reset it.
          </p>
        </div>

        <p className="mt-5 text-center font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          <Link href="/" className="transition-colors hover:text-foreground">
            &larr; Back to home
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthorSignInForm;
