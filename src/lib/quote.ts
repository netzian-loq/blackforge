import { services } from "./site";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Record<string, string>;
  values: Record<string, string>;
};

export const initialQuoteState: QuoteState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {},
};

export const NOT_SURE = "Not sure — I need an assessment";

export const SERVICE_OPTIONS: readonly string[] = [
  ...services.map((service) => service.name),
  NOT_SURE,
];
