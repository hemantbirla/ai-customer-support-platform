import "../../styles/auth.css";

const AuthCard = ({ children, className = "" }) => {
  return <div className={`auth-card ${className}`.trim()}>{children}</div>;
};

export default AuthCard;
