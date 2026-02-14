"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import {
  createClientAction,
  clientFormInitialState,
} from "@/app/clients/new/actions";
import { recurringOptions } from "@/lib/clients/schema";

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
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<string>("");

  const handleRecurringToggle = (checked: boolean) => {
    setIsRecurring(checked);
    if (!checked) {
      setFrequency("");
    }
  };

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

      <section className="space-y-4 rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <input
            id="isRecurring"
            name="isRecurring"
            type="checkbox"
            onChange={(event) => handleRecurringToggle(event.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="isRecurring" className="text-sm font-medium text-slate-800">
            Client récurrent
          </label>
        </div>

        {isRecurring && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="recurrenceFrequency">
                Fréquence
              </label>
              <select
                id="recurrenceFrequency"
                name="recurrenceFrequency"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
                defaultValue=""
                onChange={(event) => setFrequency(event.target.value)}
              >
                <option value="">Choisir...</option>
                {recurringOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "monthly" && "Mensuelle"}
                    {option === "quarterly" && "Trimestrielle"}
                    {option === "custom" && "Personnalisée"}
                  </option>
                ))}
              </select>
              {state.fieldErrors?.recurrenceFrequency && (
                <p className="text-sm text-red-500">
                  {state.fieldErrors.recurrenceFrequency[0]}
                </p>
              )}
            </div>

            {frequency === "custom" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="recurrenceCustomDays">
                  Intervalle personnalisé (jours)
                </label>
                <input
                  id="recurrenceCustomDays"
                  name="recurrenceCustomDays"
                  type="number"
                  min={1}
                  className="w-full rounded-md border border-slate-300 px-3 py-2"
                  placeholder="Ex: 45"
                />
                {state.fieldErrors?.recurrenceCustomDays && (
                  <p className="text-sm text-red-500">
                    {state.fieldErrors.recurrenceCustomDays[0]}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="recurrenceStartDate">
                Date de début
              </label>
              <input
                id="recurrenceStartDate"
                name="recurrenceStartDate"
                type="date"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              />
              {state.fieldErrors?.recurrenceStartDate && (
                <p className="text-sm text-red-500">
                  {state.fieldErrors.recurrenceStartDate[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="recurrenceEndDate">
                Date de fin (optionnelle)
              </label>
              <input
                id="recurrenceEndDate"
                name="recurrenceEndDate"
                type="date"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              />
              {state.fieldErrors?.recurrenceEndDate && (
                <p className="text-sm text-red-500">
                  {state.fieldErrors.recurrenceEndDate[0]}
                </p>
              )}
            </div>
          </div>
        )}
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
