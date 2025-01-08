import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import { GET_FRIENDS_ROUTES } from '@/utils/constants';
import api from '@/lib/api';
import { toast } from 'sonner';
import { getColor } from '@/lib/utils';

const ContactList = ({ contacts, isChannel = false }) => {
  const [error, setError] = useState(null);
  const [contactList, setContactList] = useState([]);
  const {
    mode,
    userInfo,
    setSelectedChatType,
    setSelectedChatData,
  } = useAppStore();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await api.get(GET_FRIENDS_ROUTES, {
            withCredentials: true
        })
        const friends = response.data.userFriends;
        if (friends.length === 0) {
          setError('Nenhum amigo encontrado.');
        } else {
          setContactList(friends);
          setError(null); // Remove o erro se os amigos forem encontrados
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.error || 'Erro ao buscar amigos.');
        setError('Erro ao carregar contatos.');
      }
    };

    getFriends();
  }, []); 

  const selectNewContact = async (contact) => {
    setSelectedChatType('contact');
    setSelectedChatData(contact);
  };


  return (
    <div className="px-11 pt-4">
      {error ? (
        <div className={`my-2 ${mode === 'dark' ? 'text-white' : 'text-gray-600' } `}>{error}</div>
      ) : (
        <ul className="space-y-2">
          {contactList.map((contact) => (
            <li key={contact._id} className={`cursor-pointer text-color-${getColor(userInfo.color)} border-none`} onClick={() => {
                selectNewContact(contact);
              }}>{contact.firstName} {contact.lastName}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
