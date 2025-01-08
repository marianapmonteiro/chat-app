import { useAppStore } from '@/store';
import { RiCloseFill } from 'react-icons/ri';
import { IoPersonAddSharp } from "react-icons/io5";
import { getColor } from '@/lib/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { HOST } from '@/utils/constants';
import {ADD_FRIEND_ROUTE} from  '@/utils/constants';
import api from '@/lib/api';
import { toast } from 'sonner';

const ChatHeader = () => {
  const { mode, closeChat, selectedChatData, selectedChatType, userInfo } = useAppStore();
  // ${
  //   mode === 'dark' ? ' border-white' : 'border-[#2f303b]'}

  const addFriend = async() =>{
    const userId =  userInfo.id;
    const friendId = selectedChatData._id
    try {
        const response = await api.post(ADD_FRIEND_ROUTE, {userId, friendId}, {withCredentials: true});
         toast.success(response.data)
        
    } catch (error) {
        const errorMessage = error.response?.data || "Erro ao adicionar amigo.";
        toast.error(errorMessage);
    }

}

  return (
    <div
      className={`h-[10vh] w-full border-b-[1px]
        border-neutral-400
        flex items-center justify-between`}
    >
      <div className="flex gap-5 items-center w-full justify-between px-5">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 relative flex ">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile-image"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split('').shift()
                    : selectedChatData.email.split('').shift()}
                </div>
           
              )}
            </Avatar>
          </div>
          <div className={`${mode === 'dark' ? 'text-white' : 'text-gray-600'}`}>
            {selectedChatType === 'contact' &&
              `${selectedChatData.firstName} ${selectedChatData.lastName}`}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
        <button
            className={`${
              mode === 'dark' ? 'text-white ' : 'text-neutral-500'
            } focus:border-none focus:outline-none focus:text-white duration-300 transition-all`}
            onClick={addFriend}
          >
            <IoPersonAddSharp className="text-2xl" />
          </button>
          <button
            className={`${
              mode === 'dark' ? 'text-white ' : 'text-neutral-500'
            } focus:border-none focus:outline-none focus:text-white duration-300 transition-all`}
            onClick={closeChat}
          >
            <RiCloseFill className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
