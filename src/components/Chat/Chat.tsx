import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

import TopUsers from "../TopUsers/TopUsersList";
import Message, { TMessage } from "./Message";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import sky from "../../img/sky.jpeg";
import "./Chat.scss";
import moment from "moment";
import useChat from "../hooks/useChat";
import axios from "axios";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";

interface IFintCurrentUser {
  _id: string,
  user: string
}

const createBigMessages = (messages: Array<TMessage>) => {
  const allMessages: Array<any> = [];

  let EMAIL = messages.length !== 0 && messages[0].user.email;

  messages.forEach((message: any, index) => {
    if (index === 0) {
      allMessages.push([message]);
    } else {
      if (message.user.email === EMAIL) {
        allMessages[allMessages.length - 1].push(message);
      } else {
        allMessages.push([message]);
        EMAIL = message.user.email;
      }
    }
  });

  return allMessages;
};

const findArrayOldFirstDates = (messages: Array<TMessage>) => {
  if (messages.length > 0) {
    const arrDates = [messages[0].createData];
    let currentDateInArray = moment(messages[0].createData).format("DD MM YY");

    messages.forEach((item) => {
      if (moment(item.createData).format("DD MM YY") !== currentDateInArray) {
        arrDates.push(item.createData);
        currentDateInArray = moment(item.createData).format("DD MM YY");
      }
    });
    return arrDates;
  }
};

const Chat = ({ theme = "default" }: any) => {
  const { messages, handleAddMessage } = useChat();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState(false);
  const [printFlag, setPrintFlag] = useState(false);
  const [moveScroll, setMoveScroll] = useState(true);
  const tmpUser: any = localStorage.getItem("user");
  const user = JSON.parse(tmpUser);
  const userPrintString = `${user.firstName} ${user.lastName}`;
  const messageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const counter = useRef<ReturnType<typeof setTimeout> | null>(null);
  let filteredMessages = createBigMessages(messages);
  const printUsers = useSelector((item: RootStateOrAny) => item.print.printUsers);
  const fintCurrentUser = printUsers.find((item: IFintCurrentUser) => item.user === userPrintString);

  const oldDays = findArrayOldFirstDates(messages) || [];

  const removeUserPrint = async () => {
    axios.delete(`http://localhost:8001/remove?id=${fintCurrentUser._id}`)
      .then(result => {
        dispatch({
          type: "GET_PRINT_USERS",
          payload: result.data
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const printsFunction = () => {
    counter.current && clearTimeout(counter.current);
    counter.current = setTimeout(() => {
      removeUserPrint();
      setPrintFlag(false);
    }, 2000);
  };

  const addUserPrint = async () => {
    !fintCurrentUser &&
      await axios.post('http://localhost:8001/create', {
        user: `${user.firstName} ${user.lastName}`
      })
        .then((result) => {
          dispatch({
            type: "GET_PRINT_USERS",
            payload: result.data
          });
        })
        .catch((e) => {
          console.error(e);
        });
  }

  const sendMessage = useCallback(async () => {
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
      setMoveScroll(true); // при добавлении своего сообщения скролл перемещается вниз
      handleAddMessage(value)
      setFlag(!flag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const getUsersPrint = async () => {
      axios.get('http://localhost:8001/all')
        .then(result => {
          dispatch({
            type: "GET_PRINT_USERS",
            payload: result.data
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
    getUsersPrint();
  }, []);

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

    if (len > 0 && text[0] === "!") play(text);
    if (moveScroll) {
      messageRef.current?.scrollIntoView(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setPrintFlag(true);
                  printsFunction();
                  addUserPrint();
                }}
                className="message-input"
              />
              <SendIcon
                onClick={() => sendMessage()}
                sx={{ color: "#5e5e5e", marginLeft: "10px" }}
              />
            </div>
            <div className="user-prints">
              {
                printFlag ? (
                  printUsers.map((item: IFintCurrentUser) => item.user !== userPrintString && <p>{item.user} печатает...</p>)
                ) : <></>
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(Chat);
