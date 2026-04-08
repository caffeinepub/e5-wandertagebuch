import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "../backend";

const SESSION_KEY = "e5_session_token";

export function useAuth() {
  const { actor } = useActor(createActor);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(SESSION_KEY),
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    if (!actor || !token) {
      setIsAuthenticated(false);
      setIsValidating(false);
      return;
    }
    actor.validateSession(token).then((valid) => {
      setIsAuthenticated(valid);
      if (!valid) {
        localStorage.removeItem(SESSION_KEY);
        setToken(null);
      }
      setIsValidating(false);
    });
  }, [actor, token]);

  const login = useCallback(
    async (password: string): Promise<boolean> => {
      if (!actor) return false;
      const result = await actor.verifyPassword(password);
      if (result) {
        localStorage.setItem(SESSION_KEY, result);
        setToken(result);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    },
    [actor],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, token, login, logout, isValidating };
}
