/**
 * Paystack payment integration helpers.
 * Client-side checkout should use `@paystack/inline-js` with
 * NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY. Verification happens server-side here.
 */

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export interface InitializePaystackParams {
  email: string;
  amountInKobo: number;
  reference: string;
  metadata?: Record<string, unknown>;
}

export async function initializePaystackTransaction(params: InitializePaystackParams) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountInKobo,
      reference: params.reference,
      metadata: params.metadata,
    }),
  });

  if (!response.ok) {
    throw new Error(`Paystack initialization failed with status ${response.status}`);
  }

  return response.json();
}

export async function verifyPaystackTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });

  if (!response.ok) {
    throw new Error(`Paystack verification failed with status ${response.status}`);
  }

  return response.json();
}
