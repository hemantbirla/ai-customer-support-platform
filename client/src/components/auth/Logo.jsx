const Logo = ({
  title = "AI Support",
  subtitle = "Customer Support Platform",
}) => {
  return (
    <div className="auth-logo">
      <div className="auth-logo__icon">
        <span>AI</span>
      </div>

      <div className="auth-logo__content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Logo;
