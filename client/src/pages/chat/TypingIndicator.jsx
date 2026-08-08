const TypingIndicator = ({ user }) => {
  if (!user) return null;

  return (
    <div className="typing-indicator">
      <div className="typing-avatar">{user.name?.charAt(0).toUpperCase()}</div>

      <div className="typing-content">
        <span className="typing-name">{user.name}</span>

        <span className="typing-text">is typing...</span>

        <div className="typing-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
