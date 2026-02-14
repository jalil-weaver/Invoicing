export type ClientFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const clientFormInitialState: ClientFormState = {
  status: "idle",
};
