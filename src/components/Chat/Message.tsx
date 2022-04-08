import React from "react";

interface IMessage {
  message: any[];
  user: any;
  theme?: string | undefined;
}

const Message = ({ message, user, theme }: IMessage) => {
  const { createdAt, uid, displayName, email, photoURL } = message[0];
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
            {message.map((mess) => (
              <div className="oneMessage">{mess.text}</div>
            ))}
          </div>
        </div>
      ) : (
        <div className="message-container">
          <p className="user-name">{isAdmin ? adminName : displayName}</p>
          <p className="message-content">
            <div className="message-text">
              {message.map((mess) => (
                <div className="oneMessage">{mess.text}</div>
              ))}
            </div>
          </p>
        </div>
      )}

      <img src={photoURL} className="avatar" alt="avatar" />
    </div>
  );
};

export default Message;
