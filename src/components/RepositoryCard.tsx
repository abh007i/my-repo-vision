import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, GitBranch, Star, Users, Lock, Globe } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  size: number;
  open_issues_count: number;
  topics: string[];
}

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {repository.name}
          </CardTitle>
          <div className="flex items-center gap-1">
            {repository.private ? (
              <Lock className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Globe className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
        {repository.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {repository.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {repository.stargazers_count}
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="w-4 h-4" />
            {repository.forks_count}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {repository.open_issues_count} issues
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {repository.language && (
            <Badge variant="secondary">{repository.language}</Badge>
          )}
          {repository.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Size:</span>
            <span>{(repository.size / 1024).toFixed(1)} MB</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Default branch:</span>
            <span>{repository.default_branch}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Created:</span>
            <span>{formatDate(repository.created_at)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Updated:</span>
            <span>{formatDate(repository.updated_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RepositoryCard;