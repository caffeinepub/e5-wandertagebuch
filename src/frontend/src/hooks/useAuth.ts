import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { login, clear, identity, isLoginSuccess } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = isLoginSuccess && !!identity;

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "";
      if (msg === "User is already authenticated") {
        await clear();
        setTimeout(() => void login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    isAuthenticated,
    identity,
    login: handleLogin,
    logout: handleLogout,
  };
}
