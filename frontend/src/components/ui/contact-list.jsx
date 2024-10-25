import { useAppStore } from '@/store'
import React from 'react'

const ContactList = ({contacts, isChannel = false}) => {

    const {selectedChatData, setSelectedChatData, setSelectedDataType, selectedDataType, } = useAppStore();
  return (
    <div>ContactList</div>
  )
}

export default ContactList