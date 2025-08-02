import { useState, useEffect } from 'react';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
}

export const useGitHubAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    // Check for stored token
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setAccessToken(storedToken);
      fetchUser(storedToken);
    }
  }, []);

  const login = () => {
    setShowTokenInput(true);
  };

  const loginWithToken = async (token: string) => {
    setIsLoading(true);
    try {
      // Validate token by fetching user info
      const isValid = await fetchUser(token);
      if (isValid) {
        setAccessToken(token);
        localStorage.setItem('github_token', token);
        setShowTokenInput(false);
      }
    } catch (error) {
      console.error('Error validating token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setAccessToken(null);
    setUser(null);
    setShowTokenInput(false);
  };

  const fetchUser = async (token: string) => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return false;
    }
  };

  return {
    accessToken,
    user,
    isLoading,
    showTokenInput,
    login,
    loginWithToken,
    logout,
    isAuthenticated: !!accessToken && !!user,
  };
};
