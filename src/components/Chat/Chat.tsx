import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc } from "firebase/firestore";
import { Context } from "../..";
import TopUsers from "../TopUsers/TopUsersList";
import Message from "./Message";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import SendIcon from "@mui/icons-material/Send";

import sky from "../../img/sky.jpeg";
import "./Chat.scss";

const Chat = ({ theme = "default" }: any) => {
  const { db }: any = useContext(Context);
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState(false);
  const tmpUser: any = localStorage.getItem("user");
  // const [chosenEmoji, setChosenEmoji] = useState("");
  const user = JSON.parse(tmpUser);
  const [messages = []] = useCollectionData(collection(db, "messages"));
  const messagesRef = collection(db, "messages");
  const messageRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(async () => {
    const index = `${Date.now()}`;
    const regular = /^[а-яА-Яa-zA-Z0-9\s()*_\-+!?=#:;@$%^&*,."'\][]*$/;
    const regularEmoji =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

    setValue("");

    if (!localStorage.getItem("theme"))
      localStorage.setItem("theme", "default");

    if ((!regular.test(value) && !regularEmoji.test(value)) || !value.trim()) {
      return;
    }

    if (user) {
      await setDoc(doc(messagesRef, index), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        text: value,
        createdAt: Date.now(),
      });
      setFlag(!flag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        sendMessage();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [value, sendMessage]);

  useEffect(() => {
    const len = messages.length;
    const text = messages[len - 1]?.text;

    if (len > 0 && text[0] === '!') play(text);

    messageRef.current?.scrollIntoView(false);
  }, [messages, theme]);

  useEffect(() => {
    messageRef.current?.scrollIntoView(false);
  }, [theme]);

  const play = (text : string) => {
    let audioPath = '';

    switch (text) {
      case '!sound':
        audioPath = "https://notificationsounds.com/storage/sounds/file-sounds-1303-man-its-for-you.ogg";
        break;

      case '!anime':
        audioPath = "https://www.myinstants.com/media/sounds/tuturu_1.mp3";
        break;

      case '!secret':
        audioPath = "https://notificationsounds.com/storage/sounds/file-sounds-1254-asmr-girl-i-have-a-secret.ogg";
        break;

      case '!news':
        audioPath = "https://notificationsounds.com/storage/sounds/file-sounds-1253-asmr-girl-i-got-news-for-you.ogg";
        break;

      default:
        break;
    }

    if (audioPath) {
      const audio = new Audio(audioPath);
      audio.play();
    }
  };

  return (
    <div className="main-conteiner">
      {theme === "default" ? (
        <>
          <TopUsers messages={messages} />

          <div className="chat">
            <h3>Chat</h3>
            <div className="wrapper__chat" style={{ background: sky }}>
              <div
                id="1"
                ref={messageRef}
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {messages &&
                  messages.map((message) => {
                    const { createdAt } = message;
                    return (
                      <Message
                        theme={theme}
                        key={createdAt}
                        message={message}
                        user={user}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="send-message">
              <EmojiPicker value={value} setValue={setValue} />
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={() => sendMessage()}>Send</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="chat_modern">
            <div className="wrapper__chat">
              <div
                id="1"
                ref={messageRef}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {messages &&
                  messages.map((message) => {
                    const { createdAt } = message;
                    return (
                      <Message key={createdAt} message={message} user={user} />
                    );
                  })}
              </div>
            </div>
            <div className="send-message">
              <EmojiPicker value={value} setValue={setValue} />
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="message-input"
              />
              <SendIcon
                onClick={() => sendMessage()}
                sx={{ color: "#5e5e5e", marginLeft: "10px" }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
