import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import { Context } from '../..';
import sky from '../../img/sky.jpeg'
import './Chat.scss'


const Chat = () => {
  const { db }: any = useContext(Context)
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(false);
  const tmpUser: any = localStorage.getItem('user')
  const user = JSON.parse(tmpUser)
  const [messages] = useCollectionData(
    collection(db, 'messages')
  )
  const messagesRef = collection(db, 'messages')

  const sendMessage = useCallback(async () => {
    const index = `${Date.now()}`
    const regular = /^[а-яА-Яa-zA-Z0-9()*_\-!#$%^&*,."'\][]*$/
    setValue('')
    if(!regular.test(value)) {
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

  return (
    <div>
      <h3>Chat</h3>
      <div className='wrapper__chat' style={{background: sky}}>
        <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column'}}>
          {messages && messages.map(message => {
            return (
              <div key={message?.createdAt} className='message' style={{display: 'flex', justifyContent: message?.uid === user?.uid ? 'end' : 'start' }}>
                <div style={{ background: 'lightGray', margin: 5, maxWidth: 250, padding: 5}}>
                  <div style={{display: 'flex', justifyContent: 'flex-start'}}>name: {message?.displayName}</div>
                  <div style={{display: 'flex', justifyContent: 'flex-start'}}>text: {message?.text}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={() => sendMessage()}>Sent</button>
    </div>
  )
}

export default Chat