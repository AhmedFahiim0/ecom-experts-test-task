export interface CheckoutResult {
  success: boolean;
}

// No backend in this prototype — resolves immediately so the UI can show a confirmation.
export async function submitCheckout(): Promise<CheckoutResult> {
  return { success: true };
}
