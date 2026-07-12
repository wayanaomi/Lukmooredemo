/**
 * Flutterwave payment integration helpers.
 * Client-side checkout uses `flutterwave-react-v3` with
 * NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY. Verification happens server-side here.
 */

const FLUTTERWAVE_BASE_URL = "https://api.flutterwave.com/v3";

export async function verifyFlutterwaveTransaction(transactionId: string) {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("FLUTTERWAVE_SECRET_KEY is not configured.");
  }

  const response = await fetch(`${FLUTTERWAVE_BASE_URL}/transactions/${transactionId}/verify`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });

  if (!response.ok) {
    throw new Error(`Flutterwave verification failed with status ${response.status}`);
  }

  return response.json();
}
