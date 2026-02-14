"use server";

import { clientFormSchema } from "@/lib/clients/schema";
import { getServerSupabase } from "@/lib/supabase/server-client";

export type ClientFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const initialState: ClientFormState = {
  status: "idle",
};

export async function createClientAction(
  prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const rawValues = Object.fromEntries(formData.entries());
  const parsed = clientFormSchema.safeParse(rawValues);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Merci de corriger les informations",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const values = parsed.data;
  const supabase = getServerSupabase();

  const { data: existing, error: selectError } = await supabase
    .from("clients")
    .select("id")
    .ilike("name", values.name as string)
    .maybeSingle();

  if (selectError && selectError.code !== "PGRST116") {
    return {
      status: "error",
      message: "Erreur interne lors de la vérification du client",
    };
  }

  if (existing) {
    return {
      status: "error",
      message: "Un client avec ce nom existe déjà.",
      fieldErrors: { name: ["Nom déjà utilisé"] },
    };
  }

  const isRecurring = Boolean(values.isRecurring);
  const frequency = isRecurring ? values.recurrenceFrequency : undefined;

  const { error: insertError } = await supabase.from("clients").insert({
    name: values.name,
    billing_address: values.billingAddress || null,
    contact_name: values.contactName || null,
    contact_email: values.contactEmail || null,
    contact_phone: values.contactPhone || null,
    currency: (values.currency as string).toUpperCase(),
    purchase_order_number: values.purchaseOrderNumber || null,
    is_recurring: isRecurring,
    recurrence_frequency: frequency || null,
    recurrence_custom_days:
      frequency === "custom" ? values.recurrenceCustomDays ?? null : null,
    recurrence_start_date: isRecurring ? values.recurrenceStartDate || null : null,
    recurrence_end_date: isRecurring ? values.recurrenceEndDate || null : null,
  });

  if (insertError) {
    return {
      status: "error",
      message: "Impossible de créer le client. Réessayez.",
    };
  }

  return {
    status: "success",
    message: "Client créé avec succès",
  };
}

export { initialState as clientFormInitialState };
