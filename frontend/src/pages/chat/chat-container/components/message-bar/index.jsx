import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store';
import { GrAttachment } from 'react-icons/gr';
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerLine } from 'react-icons/ri';
import EmojiPicker from 'emoji-picker-react';
import { getColor, colorsBg } from '@/lib/utils';
import { useSocket } from '@/context/SocketContext';

const MessageBar = () => {
  const { userInfo, mode, selectedChatType, selectedChatData } = useAppStore();
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const emojiRef = useRef();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (selectedChatType === 'contact') {
      socket.emit('sendMessage', {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: 'text',
        fileUrl: undefined,
      });
    }
  };
  return (
    <div className="h-[10vh] bg-transparent flex justify-center items-center px-10 bottom-0 ">
      <div
        className={`flex-1 flex ${
          mode === 'dark' ? 'bg-[#2a2b33]' : 'bg-[#dadbe0]'
        } rounded-md items-center gap-5 pr-5`}
      >
        <input
          type="text"
          className={`flex-1 p-5 bg-transparent rounded-md focus:border-none focus:ring-0 ${
            mode === 'dark' ? 'text-white' : 'text-black'
          }`}
          placeholder="Enter Message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => {
              setEmojiPickerOpen(true);
            }}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme={mode === 'dark' ? 'dark' : 'light'}
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className={`ml-4 bg-[${colorsBg[userInfo.color]}]
        )} rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none  duration-300 transition-all`}
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl text-white" />
      </button>
    </div>
  );
};

export default MessageBar;
