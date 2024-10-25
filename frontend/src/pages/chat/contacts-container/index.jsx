import { useEffect } from 'react';
import NewDm from './components/new-dm';
import ProfileInfo from './components/profile-info';
import api from '@/lib/api';
import { GET_CONTACTS_ROUTES } from '@/utils/constants';
import { useAppStore } from '@/store';
import ContactList from '@/components/ui/contact-list';

const ContactsContainer = () => {
    const {setDirectMessageContacts, directMessagesContacts} = useAppStore()
    useEffect(() => {
        const getContacts = async() => {
            const response = await api.get(GET_CONTACTS_ROUTES, {
                withCredentials: true
            })
            if (response.data.contacts) {
                setDirectMessageContacts(response.data.contacts)
            }
        }
      getContacts();
    }, [])
    
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-transparent border-r-[1px] border-neutral-400 h-[100%]">
      <div className="pt-3 pl-10">
        <h1>Logo</h1>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title title="Direct Messages" />
          <NewDm />
        </div>
        <div className="max-h-[38vh] overlow-y-auto justify-between pr-18">
            <ContactList />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title title="Channels" />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};

export default ContactsContainer;

export const Title = ({ title }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {title}
    </h6>
  );
};
