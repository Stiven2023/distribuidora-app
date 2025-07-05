"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/types";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

// Contexto global de usuario
export const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}>({
  user: null,
  setUser: () => {},
  isLoading: true,
  error: null,
  refetch: () => {},
});

const queryClient = new QueryClient();

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUser,
    retry: false,
  });

  // Solución: Aseguramos que el valor de user sea null en vez de undefined
  return (
    <UserContext.Provider value={{ user: user || null, setUser: () => {}, isLoading, error, refetch }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            {children}
          </UserProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
