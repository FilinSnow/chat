import { Firestore } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc } from "firebase/firestore";
import { Context } from '../..';
import './Chat.scss'

const Chat = () => {
  const { db }: any = useContext(Context)
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(false);
  const tmpUser: any = localStorage.getItem('user')
  const user = JSON.parse(tmpUser)

  const [messages, loading] = useCollectionData(
    collection(db, 'messages')
  )
  const messagesRef = collection(db, 'messages')

  const sendMessage = async () => {
    const index = `${Date.now()}`
    await setDoc(doc(messagesRef, index), {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: Date.now()
    });
    setFlag(!flag)
  }
  return (
    <div>
      <h3>Chat</h3>
      <div className='wrapper__chat'>
        <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {messages && messages.map(message => {
            return (
              <div key={message.createdAt} style={{display: 'flex', justifyContent: message.uid === user.uid ? 'end' : 'start' }}>
                <div style={{ background: 'lightGray', margin: 5, maxWidth: 250, padding: 5}}>
                  <div style={{display: 'flex', justifyContent: 'flex-start'}}>name: {message.displayName}</div>
                  <div style={{display: 'flex', justifyContent: 'flex-start'}}>text: {message.text}</div>
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