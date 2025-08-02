import { useState, useEffect } from 'react';

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

export const useRepositories = (accessToken: string | null) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      fetchRepositories();
    }
  }, [accessToken]);

  const fetchRepositories = async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const repos = await response.json();
        setRepositories(repos);
      } else {
        setError('Failed to fetch repositories');
      }
    } catch (error) {
      setError('Error fetching repositories');
      console.error('Error fetching repositories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    repositories,
    isLoading,
    error,
    refetch: fetchRepositories,
  };
};