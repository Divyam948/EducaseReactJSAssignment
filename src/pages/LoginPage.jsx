import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import PageShell from '../components/PageShell';
import { useUser } from '../context/UserContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isReady = formData.email.trim() && formData.password.trim();

  const handleFieldChange = (fieldName) => (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isReady) return;

    login(formData);
    navigate('/account');
  };

  return (
    <PageShell className="screen--plain">

      <button
        type="button"
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back
      </button>

      <div className="content-column">
        <div className="intro-copy intro-copy--tight">
          <h1>
            Signin to your
            <br />
            PopX account
          </h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <Field
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleFieldChange('email')}
            placeholder="Enter email address"
          />

          <Field
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleFieldChange('password')}
            placeholder="Enter password"
          />

          <button
            className={`button ${isReady ? 'button--primary' : 'button--muted'}`}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </PageShell>
  );
}

export default LoginPage;