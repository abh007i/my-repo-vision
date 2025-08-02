import RepositoryCard from "./RepositoryCard";

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

interface RepositoryGridProps {
  repositories: Repository[];
}

const RepositoryGrid = ({ repositories }: RepositoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </div>
  );
};

export default RepositoryGrid;