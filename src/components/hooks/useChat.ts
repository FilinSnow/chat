import { useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client'
import { SERVER_URI } from "../constants/constants";


const useChat = () => {
  const userString: any = localStorage.getItem('user')
  const user = JSON.parse(userString);

  const [messages, setMessages] = useState<Array<any>>([])
  const { current: socket } = useRef(
    io(SERVER_URI, {
      query: {
        roomId: '626696098f5928e2635222b9',
        userId: user?._id
      },
      transportOptions: {
        polling: {
          extraHeaders: {
            'authorization': `Bearer ${user?.accessToken}`
          }
        }
      }
    })
  )

  useEffect(() => {
    socket.emit('user:add', user)
    socket.on('messageToClient', (message) => {
      setMessages((prev) => [...prev, message])
    })
    socket.emit('joinRoom', { roomId: "626696098f5928e2635222b9" })
    socket.on('allRoomMessages', (allMessages) => {
      setMessages(allMessages)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddMessage = (message: string) => {
    const obj = {
      roomId: '626696098f5928e2635222b9',
      text: message
    }
    socket.emit('addMessage', obj)
  }

  return { messages, handleAddMessage }
}

export default useChat;