import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useAuth() {
  const { login, clear, identity, isLoginSuccess } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isAuthenticated = isLoginSuccess && !!identity;

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
      if (msg === "User is already authenticated") {
        try {
          await clear();
          await new Promise<void>((resolve) => setTimeout(resolve, 300));
          await login();
        } catch (retryError: unknown) {
          console.error("Login retry failed:", retryError);
        }
      } else {
        console.error("Login failed:", error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    isAuthenticated,
    isLoggingIn,
    identity,
    login: handleLogin,
    logout: handleLogout,
  };
}
