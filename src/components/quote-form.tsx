"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { submitQuote } from "@/app/actions";
import { initialQuoteState, SERVICE_OPTIONS } from "@/lib/quote";
import { propertyTypes, responsePromise, site } from "@/lib/site";
import { PhoneGlyph } from "./site-header";

const FIELD =
  "w-full border border-concrete-3 bg-white px-3.5 py-3 text-[0.9375rem] text-asphalt " +
  "placeholder:text-aggregate transition-colors focus:border-asphalt focus:outline-none " +
  "aria-[invalid=true]:border-ember aria-[invalid=true]:bg-ember/5";

function Field({
  id,
  label,
  optional,
  error,
  children,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="u-spec flex items-baseline gap-2 text-ink-soft">
        {label}
        {optional && <span className="normal-case tracking-normal text-aggregate">optional</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] text-ember">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuote, initialQuoteState);
  const startedAt = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  // Stamped on the client so the time-to-fill trap measures a real visit. If
  // scripting never runs, the empty default reads as "slow" and lets it pass.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  // Move attention to the error summary so a keyboard or screen reader user is
  // not left at the bottom of the form wondering what happened.
  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className="self-start border border-concrete-3 bg-white p-8 shadow-plate sm:p-10">
        <div className="h-1 w-14 bg-stripe" aria-hidden="true" />
        <h3 className="u-display mt-6 text-[1.75rem] uppercase text-asphalt">Request received.</h3>
        <p className="u-prose mt-4 text-[0.9375rem] text-ink-soft">
          We read these ourselves — no call centre. You will hear from us the same business day,
          and we will confirm what you are dealing with before anyone gets in a truck.
        </p>
        <div className="mt-7 border-t border-concrete-2 pt-6">
          <p className="u-spec text-ink-soft">Need it sooner</p>
          <a
            href={site.phone.href}
            className="u-display mt-2 inline-flex items-center gap-3 text-[1.375rem] text-asphalt underline decoration-stripe decoration-2 underline-offset-[6px]"
          >
            <PhoneGlyph className="h-5 w-5" />
            {site.phone.display}
          </a>
        </div>
      </div>
    );
  }

  const err = state.fieldErrors;
  const val = state.values;

  return (
    <form
      action={formAction}
      noValidate
      className="self-start border border-concrete-3 bg-white p-6 shadow-plate sm:p-8"
    >
      <input type="hidden" name="startedAt" ref={startedAt} defaultValue="" />

      {/* Honeypot — off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.status === "error" && (
          <p
            ref={summaryRef}
            tabIndex={-1}
            className="mb-6 border-l-2 border-ember bg-ember/8 px-4 py-3 text-[0.875rem] text-ember"
          >
            {state.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={err.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={val.name}
            aria-invalid={Boolean(err.name)}
            aria-describedby={err.name ? "name-error" : undefined}
            className={FIELD}
            placeholder="Dana Whitfield"
          />
        </Field>

        <Field id="phone" label="Phone" error={err.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            defaultValue={val.phone}
            aria-invalid={Boolean(err.phone)}
            aria-describedby={err.phone ? "phone-error" : undefined}
            className={FIELD}
            placeholder="(615) 555-0199"
          />
        </Field>

        <Field id="email" label="Email" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={val.email}
            aria-invalid={Boolean(err.email)}
            aria-describedby={err.email ? "email-error" : undefined}
            className={FIELD}
            placeholder="dana@example.com"
          />
        </Field>

        <Field id="location" label="City or address" error={err.location}>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="address-level2"
            required
            defaultValue={val.location}
            aria-invalid={Boolean(err.location)}
            aria-describedby={err.location ? "location-error" : undefined}
            className={FIELD}
            placeholder="Shelbyville, TN"
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="u-spec text-ink-soft">Property type</legend>
        <div className="mt-2.5 grid grid-cols-2 gap-3">
          {propertyTypes.map((type) => (
            <label
              key={type}
              className="group flex cursor-pointer items-center gap-2.5 border border-concrete-3 px-3 py-3 sm:gap-3 sm:px-4 transition-colors hover:border-asphalt has-[:checked]:border-asphalt has-[:checked]:bg-asphalt has-[:checked]:text-concrete"
            >
              <input
                type="radio"
                name="propertyType"
                value={type}
                required
                defaultChecked={val.propertyType === type}
                aria-describedby={err.propertyType ? "propertyType-error" : undefined}
                className="h-4 w-4 shrink-0 appearance-none rounded-full border border-aggregate bg-white transition-colors checked:border-[5px] checked:border-stripe group-has-[:checked]:bg-asphalt"
              />
              <span className="u-spec tracking-[0.08em] sm:tracking-[0.16em]">{type}</span>
            </label>
          ))}
        </div>
        {err.propertyType && (
          <p id="propertyType-error" className="mt-1.5 text-[0.8125rem] text-ember">
            {err.propertyType}
          </p>
        )}
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="service" label="What do you need" error={err.service}>
          <select
            id="service"
            name="service"
            required
            defaultValue={val.service ?? ""}
            aria-invalid={Boolean(err.service)}
            aria-describedby={err.service ? "service-error" : undefined}
            className={FIELD}
          >
            <option value="" disabled>
              Choose one
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="size" label="Rough size" optional error={err.size}>
          <input
            id="size"
            name="size"
            type="text"
            defaultValue={val.size}
            aria-invalid={Boolean(err.size)}
            aria-describedby={err.size ? "size-error" : undefined}
            className={FIELD}
            placeholder="Two-car driveway, 40 spaces…"
          />
        </Field>
      </div>

      <Field
        id="details"
        label="What are you looking at"
        optional
        error={err.details}
        className="mt-6"
      >
        <textarea
          id="details"
          name="details"
          rows={4}
          defaultValue={val.details}
          aria-invalid={Boolean(err.details)}
          aria-describedby={err.details ? "details-error" : undefined}
          className={`${FIELD} resize-y`}
          placeholder="Cracks spreading near the garage, water stands after rain, patched it two years ago…"
        />
      </Field>

      <button
        type="submit"
        disabled={pending}
        className="u-spec mt-7 w-full bg-asphalt px-6 py-4 text-[0.75rem] text-concrete transition-colors hover:bg-cured disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send quote request"}
      </button>

      <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-soft">
        No obligation and no sales calls after hours. We use your details to quote this job and
        nothing else.
      </p>
    </form>
  );
}

export function QuoteSection() {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="scroll-mt-24 border-b border-white/8 bg-concrete py-20 text-asphalt sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="u-spec flex items-center gap-2.5 text-asphalt">
              <span aria-hidden="true" className="h-2.5 w-2.5 bg-stripe" />
              Free quote
            </p>
            <h2
              id="quote-heading"
              className="u-display mt-5 text-[clamp(2rem,5.5vw,3.25rem)] uppercase text-asphalt"
            >
              Tell us what
              <br />
              you are looking at.
            </h2>
            <p className="u-prose mt-6 text-[1.0625rem] text-ink-soft">
              Five details is enough to start. If it turns out you do not need us this year, we will
              tell you that too.
            </p>

            <ol className="mt-10 space-y-0">
              {responsePromise.map((step, index) => (
                <li
                  key={step.when}
                  className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-concrete-2 py-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 bg-stripe"
                    style={{ opacity: 1 - index * 0.25 }}
                  />
                  <div>
                    <p className="u-spec text-asphalt">{step.when}</p>
                    <p className="u-prose mt-1.5 text-[0.9375rem] text-ink-soft">{step.what}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="border-t border-concrete-2 pt-7">
              <p className="u-spec text-ink-soft">Or skip the form</p>
              <a
                href={site.phone.href}
                className="u-display mt-2.5 inline-flex items-center gap-3 text-[clamp(1.5rem,3.5vw,2rem)] text-asphalt underline decoration-stripe decoration-[3px] underline-offset-[8px] transition-colors hover:text-cured"
              >
                <PhoneGlyph className="h-6 w-6" />
                {site.phone.display}
              </a>
              <p className="u-spec mt-3 text-ink-soft">{site.hours}</p>
            </div>
          </div>

          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
