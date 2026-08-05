import { MessageSquare } from "lucide-react";

const EmptyConversation = () => {
  return (
    <div className="empty-chat">
      <div className="empty-chat-content">
        <MessageSquare size={48} />
        <h3>No messages yet</h3>
        <p>Start the conversation by typing a message below.</p>
      </div>
    </div>
  );
};

export default EmptyConversation;
