import { useState } from 'react';
import api from '@/lib/api';
import { SEARCH_CONTACTS_ROUTE } from '@/utils/constants';
import { useAppStore } from '@/store';
import { HOST } from '@/utils/constants';
import Lottie from 'react-lottie';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimationDefaultOptions, getColor } from '@/lib/utils';
import { FaPlus } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { colorsBg } from '@/lib/utils';

const NewDm = () => {
  const { userInfo, mode, setSelectedChatType, setSelectedChatData } =
    useAppStore();
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (search) => {
    try {
      if (search.length > 0) {
        const response = await api.post(
          SEARCH_CONTACTS_ROUTE,
          { searchTerm: search },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        } else {
          setSearchedContacts([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectNewContact = async (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType('contact');
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  console.log('contacts', searchedContacts);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => {
                setOpenNewContactModal(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent
            className={`border-none mb-2 p-3 ${
              mode === 'dark' ? 'bg-black' : 'bg-white'
            } ${mode === 'dark' ? 'text-white' : 'text-black'}`}
          >
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent
          className={`border-none w-[400px] h-[400px] flex flex-col ${
            mode === 'dark' ? 'bg-black' : 'bg-white'
          } ${mode === 'dark' ? 'text-white' : 'text-black'}`}
        >
          <DialogHeader>
            {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
            <DialogDescription>Please select a contact</DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 border-none bg-[#2c2e3b]"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => {
                  return (
                    <div
                      key={contact._id}
                      className="flex gap-3 items-center cursor-pointer"
                      onClick={() => {
                        selectNewContact(contact);
                      }}
                    >
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.image ? (
                          <AvatarImage
                            src={`${HOST}/${contact.image}`}
                            alt="profile-image"
                            className="object-cover w-full h-full bg-black"
                          />
                        ) : (
                          <div
                            className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                              contact.color
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.split('').shift()
                              : contact.email.split('').shift()}
                          </div>
                        )}
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-xs">
                          {contact.firstName && contact.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : ''}
                        </span>
                        <span className="text-xs">{contact.email}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
          {searchedContacts.length <= 0 && (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <Lottie
                isClickToPauseDisabled={true}
                width={100}
                height={100}
                options={AnimationDefaultOptions}
              />
              <div className="text-opacity-80 text-white mt-5 flex flex-col gap-5 items-center lg:text-2xl text-xl transition-all duration-300 text-center ">
                <h3>
                  Hi! Search for a{' '}
                  <span
                    className={`text-[${getColor(
                      userInfo.color
                    )}] border-none `}
                  >
                    contact.
                  </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
