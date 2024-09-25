import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store';
import { HOST, LOGOUT_ROUTE } from '@/utils/constants';
import { getColor } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FiEdit2 } from 'react-icons/fi';
import { IoPowerSharp } from 'react-icons/io5';
import api from '@/lib/api';

const ProfileInfo = () => {
  const { userInfo, setUserInfo, mode } = useAppStore();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await api.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate('/auth');
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full ">
      <div className="flex gap-3 justify-center items-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile-image"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split('').shift()
                  : userInfo.email.split('').shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className={`${mode === 'dark' ? 'text-white' : 'text-black'} `}>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : `${userInfo.firstName}`}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                onClick={() => {
                  navigate('/profile');
                }}
                className={`text-[${getColor(
                  userInfo.color
                )}] text-xl font-medium border-none`}
              />
            </TooltipTrigger>
            <TooltipContent
              className={`border-none ${
                mode === 'dark' ? 'bg-black' : 'bg-white'
              } ${mode === 'dark' ? 'text-white' : 'text-black'}`}
            >
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                onClick={logOut}
                className={`text-[${getColor(
                  userInfo.color
                )}] text-xl font-medium border-none`}
              />
            </TooltipTrigger>
            <TooltipContent
              className={`border-none ${
                mode === 'dark' ? 'bg-black' : 'bg-white'
              } ${mode === 'dark' ? 'text-white' : 'text-black'}`}
            >
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
