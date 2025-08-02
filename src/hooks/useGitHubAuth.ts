import { useState, useEffect } from 'react';

const CLIENT_ID = 'Ov23lijWzriMZZDbbERU';
const REDIRECT_URI = window.location.origin;

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

  useEffect(() => {
    // Check for stored token
    const storedToken = localStorage.getItem('github_token');
    if (storedToken) {
      setAccessToken(storedToken);
      fetchUser(storedToken);
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      exchangeCodeForToken(code);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const login = () => {
    const authURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo`;
    window.location.href = authURL;
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setAccessToken(null);
    setUser(null);
  };

  const exchangeCodeForToken = async (code: string) => {
    setIsLoading(true);
    try {
      // In a real app, this should be done through your backend to keep the client secret secure
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: 'd7e88b8d0cb76e9a5c80f7d9e89a8e93d61b4140',
          code,
        }),
      });

      const data = await response.json();
      
      if (data.access_token) {
        setAccessToken(data.access_token);
        localStorage.setItem('github_token', data.access_token);
        await fetchUser(data.access_token);
      }
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    } finally {
      setIsLoading(false);
    }
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
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return {
    accessToken,
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!accessToken && !!user,
  };
};
