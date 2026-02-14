import { z } from "zod";

const recurringFrequencies = ["monthly", "quarterly", "custom"] as const;

export const clientFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Le nom est obligatoire")
      .max(200, "Le nom est trop long"),
    billingAddress: z
      .string()
      .trim()
      .max(1000, "Adresse trop longue")
      .optional()
      .or(z.literal("")),
    contactName: z.string().max(200).optional().or(z.literal("")),
    contactEmail: z
      .string()
      .email("Email invalide")
      .max(320)
      .optional()
      .or(z.literal("")),
    contactPhone: z.string().max(50).optional().or(z.literal("")),
    currency: z.string().length(3, "Devise sur 3 lettres").default("EUR"),
    purchaseOrderNumber: z.string().max(120).optional().or(z.literal("")),
    isRecurring: z
      .string()
      .transform((value) => value === "on")
      .optional()
      .or(z.literal(false))
      .default(false),
    recurrenceFrequency: z
      .enum(recurringFrequencies)
      .optional()
      .or(z.literal("" as never)),
    recurrenceCustomDays: z
      .string()
      .optional()
      .or(z.literal(""))
      .transform((val) => (val ? Number(val) : undefined))
      .refine((value) => !value || value > 0, {
        message: "Le nombre de jours doit être positif",
      }),
    recurrenceStartDate: z.string().optional().or(z.literal("")),
    recurrenceEndDate: z.string().optional().or(z.literal("")),
  })
  .superRefine((values, ctx) => {
    if (!values.isRecurring) {
      return;
    }

    if (!values.recurrenceFrequency) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["recurrenceFrequency"],
        message: "Choisissez une fréquence",
      });
    }

    if (values.recurrenceFrequency === "custom" && !values.recurrenceCustomDays) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["recurrenceCustomDays"],
        message: "Précisez l'intervalle en jours",
      });
    }

    if (!values.recurrenceStartDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["recurrenceStartDate"],
        message: "La date de début est requise",
      });
    }

    if (
      values.recurrenceStartDate &&
      values.recurrenceEndDate &&
      values.recurrenceEndDate < values.recurrenceStartDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["recurrenceEndDate"],
        message: "La date de fin doit être après la date de début",
      });
    }
  });

export type ClientFormValues = z.infer<typeof clientFormSchema>;
export const recurringOptions = recurringFrequencies;
