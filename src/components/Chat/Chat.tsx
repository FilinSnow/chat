import React, { useEffect, useState } from "react";
import Message from "./Message";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import SendIcon from "@mui/icons-material/Send";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./Chat.scss";
import { TMessage } from "../../utils/types/types";
import { IChat } from "../../utils/interfaces/interfaces";
import { SidePanel } from "../SidePanel/SidePanel";
import RecordVoice from "../RecordVoice/RecordVoice";
import useDataState from "../hooks/useDataState";
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import WrapperChat from "../HOC/WrapperChat";
import { styled } from '@mui/material/styles';
import { useSelector, RootStateOrAny } from 'react-redux';

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


const Chat = ({ messages, handleAddMessage, user }: IChat) => {
  const theme = useSelector((state: RootStateOrAny) => state.theme.theme);
  const [open, setOpen] = useState(false);
  const styleForInput = theme === 'dark' ? { background: theme === 'dark' ? '#424242' : '', color: '#fff' } : {};

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        setDelay(false);
        setCounterMessage(0);
        clearTimeout(timeId);
      }, 5000);
    }
  }, [delay]);

  useEffect(() => {
    if (counterMessage === 6) { // ???????????????? ?????? ???????????????????????? ?????????????????? ???????????????? ???????????? 6 ?????????????????? ???? 5 ????
      setBlockSend(true);
      
      const timeId = setTimeout(() => {
        setBlockSend(false);
        clearTimeout(timeId);
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
  }, [messages]);

  useEffect(() => {
    if (moveScroll) messageRef.current?.scrollIntoView(false);
  }, [moveScroll]);

  const handleAutoScroll = () => {
    setMoveScroll(true); // ???????????? ???????????????????????? ????????
  };

  useEffect(() => {
    const checkScrollMessage = (e: any) => {
      if (e.target.scrollHeight - e.target.scrollTop <= 690) {
        // ???????? ?????????????? ???????????????????????? ?????????????? ?????????????????? ?? ?????????? ???????? ????????
        setMoveScroll(true);
      } else {
        setMoveScroll(false);
      }
    };
    scrollRef?.current?.addEventListener("scroll", checkScrollMessage);
  }, []);

  const handleDeleteVoice = () => {
    setVoiceUrl('');
    setBlockWriteInput(false); // ???????? ?????????? ?????????? ????????????
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
    <>
      <div className="main-conteiner">
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
            zIndex: 1,
            cursor: 'pointer',
            '&:hover': {
              background: '#C5C5C4'
            }
          }}
          onClick={handleDrawerOpen}
        >
          <ChevronRightIcon />
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Drawer
            sx={{
              width: open ? '25%' : '0',
              '@media screen and (max-width: 1400px)': {
                width: open ? '30%' : '0',
              },
              '@media screen and (max-width: 860px)': {
                width: open ? '45%' : '0',
              },
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: '25%',
                boxSizing: 'border-box',
                '@media screen and (max-width: 1400px)': {
                  width: '30%',
                },
                '@media screen and (max-width: 860px)': {
                  width: '45%',
                },
                '@media screen and (max-width: 640px)': {
                  width: '100%',
                },
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader sx={{
              background: theme === 'dark' ? 'rgb(66, 66, 66)' : '#F1F1F2',
            }}>
              <IconButton onClick={handleDrawerClose} sx={{ color: theme === 'dark' ? '#fff' : '' }}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>
            <Divider />
            <SidePanel />
          </Drawer>
          <Main open={open} sx={{
            maxWidth: '100vw',
            boxSizing: 'border-box'
          }}>
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
                <div className={ theme === 'dark' ? "wrapper__chat-dark" : "wrapper__chat"} ref={scrollRef}>
                  <div
                    id="3"
                    ref={messageRef}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {messages.length > 0 &&
                      messages.map((message, index) => {
                        const firstCombined = messages[index + 1]?.user?.email || '';
                        const lastCombined = messages[index -1]?.user?.email || '';
                        return (
                          <Message
                            key={index}
                            message={message}
                            user={user}
                            isDark={theme === 'dark'}
                            oldDays={oldDays}
                            firstCombined={firstCombined}
                            lastCombined={lastCombined}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="send-message">
                <EmojiPicker value={value} setValue={setValue} />
                <div className="message-input" style={styleForInput}>
                  {showVoiceBtn && <RecordVoice setVoiceUrl={setVoiceUrl} setBlockWriteInput={setBlockWriteInput} />}
                  <div className="message-input__container">
                    <input
                      type="text"
                      value={value}
                      disabled={blockWriteInput}
                      onChange={(e) => setValue(e.target.value)}
                      style={styleForInput}
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
                  <CancelIcon fill="#fff" />
                </button>
              </div>}
            </div>
          </Main>
        </Box>
      </div>
    </>
  );
};

export default WrapperChat(React.memo(Chat));
