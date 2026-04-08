import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, Mountain } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoginModal } from "./LoginModal";
import { Button } from "./ui/button";
import { Toaster } from "./ui/sonner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-warm sticky top-0 z-40">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 group flex-1 min-w-0"
            data-ocid="header-logo"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 group-hover:bg-primary/25 transition-smooth flex-shrink-0">
              <Mountain className="w-5 h-5 text-primary" />
            </div>
            <div className="leading-tight min-w-0">
              <div className="font-display font-bold text-base text-foreground truncate">
                E5 · Wandertagebuch
              </div>
              <div className="text-[11px] text-muted-foreground font-body hidden sm:block">
                Oberstdorf → Meran · August 2026
              </div>
            </div>
          </Link>

          {/* Auth button */}
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex-shrink-0"
              data-ocid="header-logout"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Abmelden
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLogin(true)}
              className="flex-shrink-0"
              data-ocid="header-login"
            >
              <LogIn className="w-3.5 h-3.5 mr-1.5" />
              Anmelden
            </Button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container max-w-5xl mx-auto px-4 py-4 text-center text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-smooth"
          >
            caffeine.ai
          </a>
        </div>
      </footer>

      <Toaster richColors position="bottom-right" />
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
