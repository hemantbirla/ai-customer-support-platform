const ChatSkeleton = () => {
  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="chat-header-loading" />
      </div>

      <div className="chat-body">
        <div className="chat-loading">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className={`skeleton-message ${
                item % 2 === 0 ? "right" : "left"
              }`}
            >
              <div className="skeleton-avatar" />

              <div className="skeleton-bubble">
                <div className="skeleton-line long" />
                <div className="skeleton-line short" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-input-container">
        <div className="chat-input-skeleton" />
      </div>
    </div>
  );
};

export default ChatSkeleton;
