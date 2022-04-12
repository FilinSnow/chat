import React from 'react';

interface IMessageInfo {
  message: any;
  user: any;
  theme?: string | undefined;
}

const getReadableTime = (time : number) => {
  const t = new Date(time);
  const minutes = (t.getMinutes()<10?'0':'') + t.getMinutes();
  
  return `${t.getHours()}:${minutes}`;
}

const Message = ({message, user, theme}: IMessageInfo) => {
  const { createdAt, uid, displayName, email, text, photoURL } = message;
  const isOwner = uid === user?.uid;

  const admindUids = ["dkikot.exceedteam@gmail.com", "vproskurin.exceedteam@gmail.com"];
  const isAdmin = isOwner && admindUids.includes(email);
  const adminName = `${displayName} [admin]`;

  const messageTime = getReadableTime(createdAt);

  return (
    <div 
      key={createdAt} 
      className={isOwner ? 'message-owner' : 'message'}
    >
      {theme === 'default' ? 
        <div className='message-content'>  
          <div style={{marginBottom: 3}}><b>{displayName}</b></div>
          <div>{text}</div>
          <p className='message-date'>{messageTime}</p>
        </div>
          :
        <div className='message-container'>
          <p className='user-name'>{isAdmin ? adminName : displayName}</p>
          <div className='message-content'>
            {text}
            <p className='message-date'>{messageTime}</p>
          </div>
        </div>
      }

      <img src={photoURL} className='avatar' alt='avatar' />
    </div>
  )
}

export default Message;