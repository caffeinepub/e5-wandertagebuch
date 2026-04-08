import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await login(password);
    setLoading(false);
    if (ok) {
      toast.success("Erfolgreich angemeldet!");
      setPassword("");
      onClose();
    } else {
      toast.error("Falsches Passwort. Bitte erneut versuchen.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm" data-ocid="login-modal">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            Anmelden
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label
              htmlFor="login-password"
              className="text-sm text-muted-foreground"
            >
              Passwort
            </Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Zugangscode eingeben"
              autoFocus
              className="mt-1"
              data-ocid="login-password"
            />
          </div>
          <Button
            type="submit"
            disabled={!password || loading}
            className="w-full"
            data-ocid="login-submit"
          >
            {loading ? "Wird geprüft…" : "Anmelden"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
