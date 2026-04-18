function PageShell({ children, className = '' }) {
  return <section className={`screen ${className}`.trim()}>{children}</section>;
}

export default PageShell;
