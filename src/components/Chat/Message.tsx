import React from "react";


export type TMessage = {
  createdAt: number;
  text: string;
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}
interface IMessage {
  message: TMessage;
  user: any;
  theme?: string | undefined;
  
}

const Message = ({ message, user, theme }: IMessage) => {
  console.log(message);
  
  const { createdAt, uid, displayName, email, photoURL, text} = message;
  const isOwner = uid === user?.uid;

  const admindUids = [
    "dkikot.exceedteam@gmail.com",
    "vproskurin.exceedteam@gmail.com",
  ];
  const isAdmin = isOwner && admindUids.includes(email);
  const adminName = `${displayName} [admin]`;

  return (
    <div key={createdAt} className={isOwner ? "message-owner" : "message"}>
      {theme === "default" ? (
        <div className="message-content">
          <div style={{ marginBottom: 3 }}>
            <b>{displayName}</b>
          </div>
          <div className="message-text">
              <div className="oneMessage">{text}</div>
          </div>
        </div>
      ) : (
        <div className="message-container">
          <p className="user-name">{isAdmin ? adminName : displayName}</p>
          <p className="message-content">
            <div className="message-text">
                <div className="oneMessage">{text}</div>
            </div>
          </p>
        </div>
      )}

      <img src={photoURL} className="avatar" alt="avatar" />
    </div>
  );
};

export default Message;
