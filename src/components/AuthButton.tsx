import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface AuthButtonProps {
  onLogin: () => void;
  isLoading?: boolean;
}

const AuthButton = ({ onLogin, isLoading }: AuthButtonProps) => {
  return (
    <Button 
      onClick={onLogin}
      disabled={isLoading}
      size="lg"
      className="gap-2"
    >
      <Github className="w-5 h-5" />
      {isLoading ? "Signing in..." : "Sign in with GitHub"}
    </Button>
  );
};

export default AuthButton;