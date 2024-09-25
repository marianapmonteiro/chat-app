import { useRef, useEffect } from 'react';
import { useAppStore } from '@/store';
import moment from 'moment/moment';
import { colorsBg } from '@/lib/utils.js';

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType, selectedChatData, selectedChatMessages, userInfo } =
    useAppStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format('LL')}
            </div>
          )}
          {selectedChatType === 'contact' && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    console.log('msg', message);
    return (
      <div
        className={`${
          message.sender._id === selectedChatData._id
            ? 'text-left'
            : 'text-right'
        } `}
      >
        {message.messageType === 'text' && (
          <div
            className="border inline-block p-4 rounded my-1 max-w-[50%] break-words"
            style={{
              backgroundColor:
                message.sender._id !== selectedChatData._id
                  ? colorsBg[userInfo.color]
                  : '#2a2b33',
            }}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format('LT')}
        </div>
      </div>
    );
  };
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
