import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

function WelcomePage() {
  return (
    <PageShell className="screen--welcome">
      <div className="welcome-page__content">
        <div className="intro-copy">
          <h1>Welcome to PopX</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        </div>

        <div className="button-stack">
          <Link className="button button--primary" to="/register">
            Create Account
          </Link>
          <Link className="button button--secondary" to="/login">
            Already Registered? Login
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

export default WelcomePage;
