import React, { useState } from 'react'
import useChat from '../hooks/useChat';

const WrapperChat = (Component: any) => {

  const ShowComponent = (props: any) => {
    const { messages, handleAddMessage } = useChat();

    return (
      <Component {...props} messages={messages} handleAddMessage={handleAddMessage} />
    )
  }
  return ShowComponent
}

export default WrapperChat