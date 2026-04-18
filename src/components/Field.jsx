function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">
        {label}
        {required ? <span className="field__required">*</span> : null}
      </span>
      <input
        id={id}
        className="field__input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

export default Field;
