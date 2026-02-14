import { z } from "zod";

export const clientFormSchema = z.object({
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
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
