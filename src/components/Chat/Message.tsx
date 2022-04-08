import React from 'react';

interface IMessage {
  message: any;
  user: any;
  theme?: string | undefined;
}

const Message = ({message, user, theme}: IMessage) => {
  const {createdAt, uid, displayName, email, text, photoURL} = message;
  const isOwner = uid === user?.uid;

  const admindUids = ["dkikot.exceedteam@gmail.com", "vproskurin.exceedteam@gmail.com"];
  const isAdmin = isOwner && admindUids.includes(email);
  const adminName = `${displayName} [admin]`;

  return (
    <div 
      key={createdAt} 
      className={isOwner ? 'message-owner' : 'message'}
    >
      {theme === 'default' ? 
        <div className='message-content'>  
          <div style={{marginBottom: 3}}><b>{displayName}</b></div>
          <div>{text}</div>
        </div> 
          :
        <div className='message-container'>
          <p className='user-name'>{isAdmin ? adminName : displayName}</p>
          <p className='message-content'>  
            {text}
          </p>
        </div>
      }

      <img src={photoURL} className='avatar' alt='avatar' />
    </div>
  )
}

export default Message;