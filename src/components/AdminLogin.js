import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = ({ adminSession }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { isAuthenticated, login, error, isLoading } = adminSession;

  // Already logged in - nothing to do here.
  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.username, form.password);
    if (success) navigate('/');
  };

  return (
    <div className="admin-login-screen">
      <div className="admin-login-card">
        <button
          type="button"
          className="admin-login-back"
          onClick={() => navigate('/')}
        >
          ← Back to site
        </button>

        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
          />

          {error && (
            <p role="alert" className="admin-login-error">
              {error}
            </p>
          )}

          <button type="submit" className="admin-login-submit" disabled={isLoading}>
            {isLoading ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
