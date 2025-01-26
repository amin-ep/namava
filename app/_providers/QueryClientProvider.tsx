"use client";
import {
  QueryClientProvider as Provider,
  QueryClient,
} from "@tanstack/react-query";
function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0.5 * 60 * 1000,
      },
    },
  });
  return <Provider client={queryClient}>{children}</Provider>;
}

export default QueryClientProvider;
