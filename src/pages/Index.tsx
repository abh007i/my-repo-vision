import { useGitHubAuth } from "@/hooks/useGitHubAuth";
import { useRepositories } from "@/hooks/useRepositories";
import AuthButton from "@/components/AuthButton";
import RepositoryGrid from "@/components/RepositoryGrid";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Shield, Database, LogOut, Loader2 } from "lucide-react";

const Index = () => {
  const { accessToken, user, isLoading: authLoading, showTokenInput, login, loginWithToken, logout, isAuthenticated } = useGitHubAuth();
  const { repositories, isLoading: reposLoading, error } = useRepositories(accessToken);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-8 max-w-md mx-auto px-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-primary/10">
                <Shield className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">SCA Scanner</h1>
            <p className="text-muted-foreground">
              Analyze your repositories for software composition insights and security vulnerabilities
            </p>
          </div>
          <AuthButton 
            onLogin={login} 
            onTokenLogin={loginWithToken}
            isLoading={authLoading} 
            showTokenInput={showTokenInput}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">SCA Scanner</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
                    <AvatarFallback>{user.login.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name || user.login}</span>
                </div>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-foreground">Repository Analysis</h2>
              <p className="text-muted-foreground">
                Overview of your repositories and their composition
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-muted-foreground" />
              <Badge variant="secondary">
                {repositories.length} repositories
              </Badge>
            </div>
          </div>

          {reposLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading repositories...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
            </div>
          ) : repositories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No repositories found</p>
            </div>
          ) : (
            <RepositoryGrid repositories={repositories} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
