import ChatHeader from './components/chat-header';
import MessageContainer from './components/message-container';
import MessageBar from './components/message-bar';

const ChatContainer = () => {
  return (
    <div className=" flex-1 top-0 h-[100%] w-[100%] bg-transparent flex flex-col md text-white">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};

export default ChatContainer;
