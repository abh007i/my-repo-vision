import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";

interface AuthButtonProps {
  onLogin: () => void;
  onTokenLogin: (token: string) => void;
  isLoading?: boolean;
  showTokenInput?: boolean;
}

const AuthButton = ({ onLogin, onTokenLogin, isLoading, showTokenInput }: AuthButtonProps) => {
  const [token, setToken] = useState("");

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onTokenLogin(token.trim());
    }
  };

  if (showTokenInput) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Enter GitHub Token</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Personal Access Token</Label>
              <Input
                id="token"
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Create a token at{" "}
                <a 
                  href="https://github.com/settings/tokens/new?scopes=repo,user" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  GitHub Settings
                  <ExternalLink className="w-3 h-3" />
                </a>
                {" "}with 'repo' and 'user' scopes
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!token.trim() || isLoading}
            >
              {isLoading ? "Validating..." : "Connect"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button 
      onClick={onLogin}
      disabled={isLoading}
      size="lg"
      className="gap-2"
    >
      <Github className="w-5 h-5" />
      {isLoading ? "Signing in..." : "Connect with GitHub Token"}
    </Button>
  );
};

export default AuthButton;