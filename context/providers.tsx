"use client";

import { useState, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { makeStore } from "@/store";

export function Providers({ children }: { children: ReactNode }) {
  const [store] = useState(() => makeStore());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider delay={150}>
              {children}
              <Toaster position="top-center" richColors closeButton />
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
