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
import { SidePanel } from "../SidePanel/SidePanel";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-240px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



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
  const [ value, setValue ] = useState("");
  const [ open, setOpen ] = useState(false);
  const [ flag, setFlag ] = useState(false);
  const [ moveScroll, setMoveScroll ] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { messages, handleAddMessage } = useChat();

  const tmpUser: any = localStorage.getItem("user");
  const user = JSON.parse(tmpUser);
  const messageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  let filteredMessages = createBigMessages(messages);

  const oldDays = findArrayOldFirstDates(messages) || [];


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
          <Box
            sx={{
              display: open ? 'none' : 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '150px',
              background: 'silver',
              borderRadius: '0 10px 10px 0',
              position: 'absolute',
              top: '40%',
              cursor: 'pointer',
              '&:hover': {
                background: '#C5C5C4'
              }
            }}
            onClick={handleDrawerOpen}
          >
            <ChevronRightIcon />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Drawer
              sx={{
                width: '30%',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: '30%',
                  boxSizing: 'border-box',
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </DrawerHeader>
              <Divider />
              <SidePanel />
            </Drawer>
            <Main open={open}>
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
                    onChange={(e) => setValue(e.target.value)}
                    className="message-input"
                  />
                  <SendIcon
                    onClick={() => sendMessage()}
                    sx={{ color: "#5e5e5e", marginLeft: "10px" }}
                  />
                </div>
              </div>
            </Main>
          </Box>
        </>
      )}
    </div>
  );
};

export default React.memo(Chat);
