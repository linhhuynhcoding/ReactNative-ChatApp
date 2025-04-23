"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               staleTime: Infinity,
               refetchOnMount: false,
          },
     },
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
     return (
          <>
               <QueryClientProvider client={queryClient}>
                    {children}
               </QueryClientProvider>
          </>
     )
}