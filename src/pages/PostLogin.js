// src/pages/PostLogin.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PostLogin() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  // ✅ Use Replit backend URL or fallback
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://5914e34b-5374-4c2b-ac7f-284078e07b90-00-25n0w53arrsx8.janeway.replit.dev';

  useEffect(() => {
    console.log("🔄 PostLogin mounted");

    fetch(`${baseURL}/api/session`, { credentials: 'include' })
      .then(res => {
        console.log("🛰️ /api/session response status:", res.status);
        return res.json();
      })
      .then(data => {
        console.log("📦 Session data:", data);

        if (data && data.email) {
          setIsAuthenticated(true);
          setUser(data);
          console.log("✅ Auth success, redirecting...");

          if (data.first_login) {
            navigate('/welcome');
          } else {
            navigate('/dashboard');
          }
        } else {
          console.warn("❌ Invalid session, redirecting to /login");
          navigate('/login');
        }
      })
      .catch(err => {
        console.error("🚫 Fetch error:", err);
        navigate('/login');
      });
  }, [navigate, setIsAuthenticated, setUser, baseURL]);

  return <div>Redirecting...</div>;
}

export default PostLogin;

