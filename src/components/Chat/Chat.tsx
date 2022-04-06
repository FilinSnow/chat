import React, 
  { 
    useCallback, 
    useContext, 
    useEffect, 
    useState,
    useRef
  } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import { Context } from '../..';
import TopUsers from '../TopUsers/TopUsersList';

import sky from '../../img/sky.jpeg'
import './Chat.scss'

const Chat = (data : any) => {
  console.log("theme=", data)
  const { db }: any = useContext(Context);
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(false);
  const tmpUser: any = localStorage.getItem('user');
  const user = JSON.parse(tmpUser);
  const [messages = []] = useCollectionData(
    collection(db, 'messages')
  );
  const messagesRef = collection(db, 'messages');
  const messageRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(async () => {
    const index = `${Date.now()}`;
    const regular = /^[а-яА-Яa-zA-Z0-9\s()*_\-!?=#$%^&*,."'\][]*$/;

    setValue('');
    
    if(!regular.test(value) || !value.trim()) {
      return 
    }
    
    if (user) {
      await setDoc(doc(messagesRef, index), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: Date.now()
      });
      setFlag(!flag)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]) 
  
  useEffect(() => {
    const listener = (event:any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        sendMessage()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [value, sendMessage]);

  useEffect(() => {
    const len = messages.length;

    if (len > 0 && messages[len - 1].text === '!sound') {
      play();
    }

    messageRef.current?.scrollIntoView(false);

  }, [messages])

  const play = () => {
    const audio = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1303-man-its-for-you.ogg");
    audio.play();
  }

  return (
    <div className='main-conteiner'>
      <TopUsers messages={messages}/>

      <div className='chat'>
        <h3>Chat</h3>
        <div className='wrapper__chat' style={{background: sky}}>
          <div id='1' ref={messageRef} style={{ margin: '0 auto', display: 'flex', flexDirection: 'column'}}>
            {messages && messages.map(message => {
              const {createdAt, uid, displayName, text, photoURL} = message;
              const isOwner = uid === user?.uid;

              return (
                <div 
                  key={createdAt} 
                  className={isOwner ? 'message' : 'message-owner'}
                >
                  <div className='message-content'>
                    <div><i>name:</i> {displayName}</div>
                    <div><i>text:</i> {text}</div>
                  </div>
                  <img src={photoURL} className='avatar' alt='avatar' />
                </div>
              )
            })}
          </div>
        </div>
        <div className='send-message'>
          <input 
            type="text" 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={() => sendMessage()}>Send</button>
        </div>       
      </div>
    </div>
  )
}

export default Chat