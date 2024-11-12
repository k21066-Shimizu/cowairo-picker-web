import { z } from "zod";

export const sliderSchema = z.coerce
  .number({ message: "Value is required" })
  .min(1, { message: "Value must be greater than 1" })
  .max(7, { message: "Value must be less than 7" })
  .optional();

export const formSchema = z.object({
  gen: sliderSchema,
  lsn: sliderSchema,
  unq: sliderSchema,
  age: sliderSchema,
  clr: sliderSchema,
  pow: sliderSchema,
  brt: sliderSchema,
});

export type FormValues = z.infer<typeof formSchema>;
