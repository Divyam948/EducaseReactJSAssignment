import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from '../components/Field';
import PageShell from '../components/PageShell';
import { useUser } from '../context/UserContext';

const initialFormData = {
  fullName: '',
  phoneNumber: '',
  email: '',
  password: '',
  companyName: '',
  isAgency: true,
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (fieldName) => (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [fieldName]: event.target.value,
    }));
  };

  const handleAgencyChange = (value) => () => {
    setFormData((currentData) => ({
      ...currentData,
      isAgency: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register(formData);
    navigate('/account');
  };

  return (
    <PageShell className="screen--plain">
      <form className="content-column content-column--full" onSubmit={handleSubmit}>
        <div className="intro-copy intro-copy--tight">
          <h1>
            Create your
            <br />
            PopX account
          </h1>
        </div>

        <div className="form form--spacious">
          <Field
            id="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleFieldChange('fullName')}
            placeholder="Marry Doe"
            required
          />

          <Field
            id="phoneNumber"
            label="Phone number"
            value={formData.phoneNumber}
            onChange={handleFieldChange('phoneNumber')}
            placeholder="Marry Doe"
            required
          />

          <Field
            id="registerEmail"
            label="Email address"
            type="email"
            value={formData.email}
            onChange={handleFieldChange('email')}
            placeholder="Marry Doe"
            required
          />

          <Field
            id="registerPassword"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleFieldChange('password')}
            placeholder="Marry Doe"
            required
          />

          <Field
            id="companyName"
            label="Company name"
            value={formData.companyName}
            onChange={handleFieldChange('companyName')}
            placeholder="Marry Doe"
          />

          <fieldset className="radio-group">
            <legend>
              Are you an Agency?<span className="field__required">*</span>
            </legend>

            <label className="radio-option" htmlFor="agencyYes">
              <input
                id="agencyYes"
                name="agency"
                type="radio"
                checked={formData.isAgency}
                onChange={handleAgencyChange(true)}
              />
              <span>Yes</span>
            </label>

            <label className="radio-option" htmlFor="agencyNo">
              <input
                id="agencyNo"
                name="agency"
                type="radio"
                checked={!formData.isAgency}
                onChange={handleAgencyChange(false)}
              />
              <span>No</span>
            </label>
          </fieldset>
        </div>

        <button className="button button--primary button--submit" type="submit">
          Create Account
        </button>
      </form>
    </PageShell>
  );
}

export default RegisterPage;
