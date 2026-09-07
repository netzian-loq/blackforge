"use server";

import { propertyTypes, site } from "@/lib/site";
import { SERVICE_OPTIONS, type QuoteState } from "@/lib/quote";

/** Bots fill every field they find. Humans never see this one. */
const HONEYPOT_FIELD = "company";
/** Nobody completes seven fields in under two and a half seconds. */
const MIN_FILL_MS = 2500;

function str(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const values = {
    name: str(formData, "name"),
    phone: str(formData, "phone"),
    email: str(formData, "email"),
    propertyType: str(formData, "propertyType"),
    service: str(formData, "service"),
    location: str(formData, "location"),
    size: str(formData, "size"),
    details: str(formData, "details"),
  };

  // Spam traps. Both give the bot the success it is looking for and stop here,
  // because telling it what tripped only teaches it to get past next time.
  const startedAt = Number(str(formData, "startedAt"));
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (str(formData, HONEYPOT_FIELD) !== "" || tooFast) {
    return { status: "success", message: "", fieldErrors: {}, values: {} };
  }

  const fieldErrors: Record<string, string> = {};

  if (values.name.length < 2) {
    fieldErrors.name = "Enter your name so we know who we are calling.";
  } else if (values.name.length > 80) {
    fieldErrors.name = "That name is longer than we can store.";
  }

  if (!values.phone) {
    fieldErrors.phone = "Add a phone number — it is the fastest way to reach you.";
  } else if (digits(values.phone).length < 10) {
    fieldErrors.phone = "That number is short. Include the area code.";
  }

  if (!values.email) {
    fieldErrors.email = "Add an email so we can send the written quote.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    fieldErrors.email = "Check the email address — we could not read it.";
  }

  if (!propertyTypes.includes(values.propertyType as (typeof propertyTypes)[number])) {
    fieldErrors.propertyType = "Pick residential or commercial.";
  }

  if (!SERVICE_OPTIONS.includes(values.service)) {
    fieldErrors.service = "Choose a service, or tell us you need an assessment.";
  }

  if (!values.location) {
    fieldErrors.location = "Tell us the city or address so we can confirm we cover it.";
  } else if (values.location.length > 160) {
    fieldErrors.location = "Shorten this to a street address or city.";
  }

  if (values.size.length > 120) fieldErrors.size = "Keep this to a short description.";
  if (values.details.length > 2000) fieldErrors.details = "Trim this to under 2000 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "A few fields need another look before we can send this.",
      fieldErrors,
      values,
    };
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    ...values,
  };

  // Logged unconditionally and first, so a lead survives an email outage and
  // can be recovered from the Vercel function logs.
  console.log("[quote-request]", JSON.stringify(lead));

  try {
    await deliverLead(lead);
  } catch (error) {
    // The visitor did nothing wrong, so they still get a confirmation — but
    // this needs to be loud in the logs and in monitoring.
    console.error("[quote-request] delivery failed", error);
  }

  return { status: "success", message: "", fieldErrors: {}, values: {} };
}

type Lead = { receivedAt: string } & Record<string, string>;

/**
 * Sends the lead to the shop inbox through Resend's REST API — no SDK, so this
 * adds nothing to the bundle and starts working the moment the key exists.
 *
 * Until RESEND_API_KEY and QUOTE_TO_EMAIL are set in the Vercel project, leads
 * are captured in the function logs only. See README, "Wire up lead delivery".
 */
async function deliverLead(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL ?? site.email;
  const from = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !from) {
    console.warn(
      "[quote-request] email delivery is not configured; lead captured in logs only. " +
        "Set RESEND_API_KEY and QUOTE_FROM_EMAIL to enable it.",
    );
    return;
  }

  const lines = [
    `Name:      ${lead.name}`,
    `Phone:     ${lead.phone}`,
    `Email:     ${lead.email}`,
    `Property:  ${lead.propertyType}`,
    `Service:   ${lead.service}`,
    `Location:  ${lead.location}`,
    `Size:      ${lead.size || "—"}`,
    "",
    "Details:",
    lead.details || "—",
    "",
    `Received:  ${lead.receivedAt}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `Quote request — ${lead.propertyType}, ${lead.service} (${lead.location})`,
      text: lines,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}
