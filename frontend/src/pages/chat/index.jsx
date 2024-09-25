import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store/index';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './chat-container';
import EmptyChatContainer from './empty-chat-container';
import ContactsContainer from './contacts-container';
import { HOST } from '@/utils/constants';
import { IoIosSettings } from 'react-icons/io';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getColor, themes, colors } from '@/lib/utils';

const Chat = () => {
  const { userInfo, theme, setTheme, setMode, selectedChatType } =
    useAppStore();
  const navigate = useNavigate();
  const [backgroundImg, setBackgroundImg] = useState('/chat-background.jpg');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast('Please setup your profile first');
      navigate('/profile');
    } else if (
      userInfo.profileSetup &&
      localStorage.getItem('background-image') !== 'null'
    ) {
      setBackgroundImg(localStorage.getItem('background-image'));
    }
  }, [userInfo, navigate]);

  const changeBackgroundImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      localStorage.setItem('background-image', reader.result);
      // setBackgroundImg(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const resetSettings = () => {
    setBackgroundImg('/chat-background.jpg');
    setTheme(themes[0].color);
    setMode(themes[0].mode);

    localStorage.setItem('background-image', null);
  };

  const saveSettings = () => {
    setSelectedColor(themes[0]);
    setTheme(selectedColor.color);
    setMode(selectedColor.mode);
    // setBackgroundImg(localStorage.getItem('background-image'));
    const storedBackgroundImg = localStorage.getItem('background-image');
    if (storedBackgroundImg !== 'null') {
      setBackgroundImg(storedBackgroundImg);
    } else {
      setBackgroundImg(backgroundImg);
    }
  };

  return (
    <div
      className={`w-full h-screen relative bg-cover bg-center bg-no-repeat flex justify-center items-center`}
      style={{
        backgroundImage: `url('${backgroundImg}')`, // Corrige para usar url()
      }}
    >
      <Dialog>
        <DialogTrigger className="absolute md:top-4 left-4 xs:top-1">
          <IoIosSettings
            className="text-[36px] cursor-pointer"
            style={{ color: theme }}
          />
        </DialogTrigger>
        <DialogContent className="bg-[#1b1c24]">
          <DialogHeader className="text-white">
            <DialogTitle>SETTINGS</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you’re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="background" className="col-span-2 text-white">
                Background Image:
              </Label>
              <Input
                id="background"
                type="file"
                className="bg-[#444758] col-span-2 border-none"
                onChange={changeBackgroundImg} // Corrige para usar onChange
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="username" className="col-span-2 text-white">
                Color
              </Label>
              <div className="w-full flex gap-5">
                {themes.map((color, index) => {
                  return (
                    <div
                      style={{ backgroundColor: color.color }}
                      className={`h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                        selectedIndex === index ? 'outline outline-white' : ''
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedIndex(index);
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between xs:gap-2">
            <DialogClose asChild>
              <Button variant="destructive" onClick={resetSettings}>
                Reset Settings
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={saveSettings}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div
        style={{
          backgroundColor: theme,
        }}
        className={`h-[90%] w-[90%] shadow-lg ring-1 ring-black/5 bg-opacity-75 rounded-[12px] backdrop-blur-[10px] backdrop-saturate-100 flex`}
      >
        <ContactsContainer />
        {/* <EmptyChatContainer /> */}
        {selectedChatType === undefined ? (
          <EmptyChatContainer />
        ) : (
          <ChatContainer />
        )}
        {/* <ChatContainer /> */}
      </div>
    </div>
  );
};

export default Chat;
