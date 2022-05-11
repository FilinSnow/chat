import React, { useEffect } from "react";

import TopUsers from "../TopUsers/TopUsersList";
import Message from "./Message";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import sky from "../../img/sky.jpeg";
import "./Chat.scss";
import { TMessage } from "../../utils/types/types";
import { IChat } from "../../utils/interfaces/interfaces";
import RecordVoice from "../RecordVoice/RecordVoice";
import useDataState from "../hooks/useDataState";
import CancelIcon from '@mui/icons-material/Cancel';


const Chat = ({ theme = "default", messages, handleAddMessage, user }: IChat) => {

  const {
    value, setValue, messageRef,
    scrollRef, moveScroll, setMoveScroll,
    filteredMessages, delay, setDelay,
    counterMessage, setCounterMessage,
    setBlockSend, oldDays, sendMessage,
    setVoiceUrl, blockWriteInput, voiceUrl,
    setBlockWriteInput, showVoiceBtn,
  } = useDataState({ messages, user, handleAddMessage })

  useEffect(() => {
    if (delay) {
      const timeId = setTimeout(() => {
        setDelay(false)
        setCounterMessage(0)
        clearTimeout(timeId)
      }, 5000)
    }
  }, [delay])

  useEffect(() => {
    if (counterMessage === 6) { // проверка что отправленные сообщения достигли лимита 6 сообщений за 5 се
      setBlockSend(true)
      const timeId = setTimeout(() => {
        setBlockSend(false);
        clearTimeout(timeId)
      }, 3000)
    }
  }, [counterMessage])

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
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

    if (len > 0 && text[0] === "!") play(text);
    if (moveScroll) {
      messageRef.current?.scrollIntoView(false);
    }
  }, [messages, theme]);

  useEffect(() => {
    if (moveScroll) {
      messageRef.current?.scrollIntoView(false);
    }
  }, [moveScroll]);

  const handleAutoScroll = () => {
    setMoveScroll(true); // скролл перемещается вниз
  };

  useEffect(() => {
    const checkScrollMessage = (e: any) => {
      if (e.target.scrollHeight - e.target.scrollTop <= 690) {
        // если текущее расположение скролла находится в самом низу чата
        setMoveScroll(true);
      } else {
        setMoveScroll(false);
      }
    };
    scrollRef?.current?.addEventListener("scroll", checkScrollMessage);
  }, [theme]);

  const handleDeleteVoice = () => {
    setVoiceUrl('');
    setBlockWriteInput(false); // блок инпут ввода текста
  }

  const play = (text: string) => {
    let audioPath = "";
    switch (text) {
      case "!sound":
        audioPath =
          "https://notificationsounds.com/storage/sounds/file-sounds-1303-man-its-for-you.ogg";
        break;

      case "!anime":
        audioPath = "https://www.myinstants.com/media/sounds/tuturu_1.mp3";
        break;

      case "!secret":
        audioPath =
          "https://notificationsounds.com/storage/sounds/file-sounds-1254-asmr-girl-i-have-a-secret.ogg";
        break;

      case "!news":
        audioPath =
          "https://notificationsounds.com/storage/sounds/file-sounds-1253-asmr-girl-i-got-news-for-you.ogg";
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
            <div
              id="2"
              className="wrapper__chat"
              style={{ background: sky }}
              ref={scrollRef}
            >
              <div
                id="1"
                ref={messageRef}
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {filteredMessages.length > 0 &&
                  filteredMessages.map((message: Array<TMessage>, index) => {
                    return (
                      <Message
                        theme={theme}
                        key={index}
                        message={message}
                        user={user}
                        oldDays={oldDays}
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
            <div className="wrapper__chat__img">
              {!moveScroll && (
                <div
                  className="arrow-to-bottom"
                  onClick={() => handleAutoScroll()}
                >
                  <ArrowDownwardIcon />
                </div>
              )}
              <div className="wrapper__chat" ref={scrollRef}>
                <div
                  id="3"
                  ref={messageRef}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {filteredMessages.length > 0 &&
                    filteredMessages.map((message: Array<TMessage>, index) => {
                      return (
                        <Message
                          key={index}
                          message={message}
                          user={user}
                          oldDays={oldDays}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="send-message">
              <EmojiPicker value={value} setValue={setValue} />
              <div className="message-input">
                {showVoiceBtn && <RecordVoice setVoiceUrl={setVoiceUrl} setBlockWriteInput={setBlockWriteInput} />}
                <div className="message-input__container">
                  <input
                    type="text"
                    value={value}
                    disabled={blockWriteInput}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
              <SendIcon
                onClick={() => sendMessage()}
                sx={{ color: "#5e5e5e", marginLeft: "10px" }}
              />
            </div>
            {voiceUrl && <div className="container__audio">
              <audio src={`https://exceed-chat-app.herokuapp.com/voices/${voiceUrl}`} controls></audio>
              <button className="cancel__audio" onClick={handleDeleteVoice}>
                <CancelIcon fill="#fff"/>
              </button>
            </div>}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Chat);
