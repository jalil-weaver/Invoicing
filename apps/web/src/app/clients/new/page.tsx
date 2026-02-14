import { ClientForm } from "@/components/clients/client-form";

export default function NewClientPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 py-10">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">Clients</p>
        <h1 className="text-2xl font-semibold text-slate-900">Créer un client</h1>
        <p className="text-sm text-slate-600">
          Renseignez les informations nécessaires pour lancer la facturation.
        </p>
      </div>
      <ClientForm />
    </div>
  );
}
