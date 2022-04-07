import React from 'react';

interface IMessage {
  message: any;
  user: any;
}

const Message = ({message, user}: IMessage) => {
  const {createdAt, uid, displayName, text, photoURL} = message;
  const isOwner = uid === user?.uid;

  return (
    <div 
      key={createdAt} 
      className={isOwner ? 'message' : 'message-owner'}
    >
      <div className='message-content'>  
        <div style={{marginBottom: 3}}><b>{displayName}</b></div>
        <div>{text}</div>
      </div>
      <img src={photoURL} className='avatar' alt='avatar' />
    </div>
  )
}

export default Message;