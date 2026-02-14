"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createClientAction, clientFormInitialState } from "@/app/clients/new/actions";

const currencies = [
  { label: "Euro (EUR)", value: "EUR" },
  { label: "Dollar (USD)", value: "USD" },
  { label: "Livre (GBP)", value: "GBP" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Création..." : "Créer le client"}
    </button>
  );
}

export function ClientForm() {
  const [state, formAction] = useFormState(createClientAction, clientFormInitialState);

  return (
    <form action={formAction} className="space-y-8">
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="name">
            Nom du client *
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="Ex: Acme Corp"
          />
          {state.fieldErrors?.name && (
            <p className="text-sm text-red-500">{state.fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="currency">
            Devise
          </label>
          <select
            id="currency"
            name="currency"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            defaultValue="EUR"
          >
            {currencies.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="billingAddress">
            Adresse de facturation
          </label>
          <textarea
            id="billingAddress"
            name="billingAddress"
            rows={3}
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="Rue, code postal, ville, pays"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="contactName">
            Contact principal
          </label>
          <input
            id="contactName"
            name="contactName"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="Nom et prénom"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="contactEmail">
            Email du contact
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="finance@client.com"
          />
          {state.fieldErrors?.contactEmail && (
            <p className="text-sm text-red-500">{state.fieldErrors.contactEmail[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="contactPhone">
            Téléphone
          </label>
          <input
            id="contactPhone"
            name="contactPhone"
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="+33 6 00 00 00 00"
          />
        </div>
      </section>

      <section className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="purchaseOrderNumber">
          Numéro de bon de commande (optionnel)
        </label>
        <input
          id="purchaseOrderNumber"
          name="purchaseOrderNumber"
          className="w-full rounded-md border border-slate-300 px-3 py-2"
          placeholder="PO-2026-001"
        />
      </section>

      {state.status === "success" && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {state.message}
        </div>
      )}

      {state.status === "error" && state.message && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
