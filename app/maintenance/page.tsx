import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Site Under Maintenance",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="bg-gradient-brand flex h-16 w-16 items-center justify-center rounded-2xl shadow-brand-md">
        <span className="font-heading text-2xl font-bold text-white">L</span>
      </div>
      <h1 className="font-heading text-3xl font-bold sm:text-4xl">We&apos;ll be right back</h1>
      <p className="max-w-md text-muted-foreground">
        Lukmoore is currently undergoing scheduled maintenance to bring you an even better
        shopping experience. Please check back shortly.
      </p>
      <p className="text-sm text-muted-foreground">
        Need urgent help? Email{" "}
        <a href="mailto:support@lukmoore.com" className="text-brand-red underline">
          support@lukmoore.com
        </a>
      </p>
    </div>
  );
}
