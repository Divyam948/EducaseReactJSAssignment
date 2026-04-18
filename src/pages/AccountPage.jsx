import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarPortrait from '../assets/avatar-portrait.svg';
import PageShell from '../components/PageShell';
import { useUser } from '../context/UserContext';

function AccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <PageShell className="screen--account">
      
      <header className="account-header">
        <h1>Account Settings</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="account-card">
        <div className="account-card__profile">
          <div className="avatar">
            <img src={avatarPortrait} alt={`${user.fullName} profile`} />
            <span className="avatar__badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation">
                <path
                  d="M9 6.5 10.3 5h3.4L15 6.5h2.2A1.8 1.8 0 0 1 19 8.3v7.4a1.8 1.8 0 0 1-1.8 1.8H6.8A1.8 1.8 0 0 1 5 15.7V8.3A1.8 1.8 0 0 1 6.8 6.5H9Zm3 2.1a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm0 1.6a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </div>

          <div className="account-card__identity">
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <p className="account-card__copy">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
          Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat,
          Sed Diam
        </p>
      </div>
    </PageShell>
  );
}

export default AccountPage;