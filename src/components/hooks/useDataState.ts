import { useCallback, useEffect, useRef, useState } from "react";
import { UserLocalStorage } from "../../utils/interfaces/interfaces";
import { createBigMessages, findArrayOldFirstDates } from "../../utils/utils";

const useDataState = ({ messages, user, handleAddMessage }: UserLocalStorage) => {
  const [value, setValue] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [moveScroll, setMoveScroll] = useState(true);
  let filteredMessages = createBigMessages(messages);
  const [delay, setDelay] = useState(false);
  const [counterMessage, setCounterMessage] = useState(0);
  const [blockSend, setBlockSend] = useState(false);
  const oldDays = findArrayOldFirstDates(messages) || [];
  const [voiceUrl, setVoiceUrl] = useState('')
  const [blockWriteInput, setBlockWriteInput] = useState(false);
  const [showVoiceBtn, setShowVoiceBtn] = useState(false)

  const sendMessage = useCallback(async () => {
    const regular = /^[а-яА-Яa-zA-Z0-9\s()*_\-+!?=#:;@$%^&*,."'\][]*$/;
    const regularEmoji =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

    setDelay(true)
    setCounterMessage((prevState) => prevState + 1)
    setValue("");

    if (user && !blockSend) {
      if (voiceUrl) {
        setMoveScroll(true); // при добавлении своего сообщения скролл перемещается вниз
        handleAddMessage({ message: '', audio: voiceUrl })
        setBlockWriteInput(false) // инпут текста не блокируется 
        setVoiceUrl('')
      } else {
        const isCheckTextAndEmoji = (!regular.test(value) && !regularEmoji.test(value));
        if (isCheckTextAndEmoji || !value.trim()) {
          return;
        }
        setMoveScroll(true); // при добавлении своего сообщения скролл перемещается вниз
        handleAddMessage({ message: value, audio: '' })
      }
    }
  }, [value, voiceUrl]);

  useEffect(() => {
    if (!value.trim()) {
      setShowVoiceBtn(true)
    } else {
      setShowVoiceBtn(false)
    }

  }, [value])

  return {
    value, setValue, messageRef,
    scrollRef, moveScroll, setMoveScroll,
    filteredMessages, delay, setDelay,
    counterMessage, setCounterMessage,
    blockSend, setBlockSend, oldDays,
    sendMessage, voiceUrl, setVoiceUrl,
    blockWriteInput, setBlockWriteInput,
    showVoiceBtn,
  }
}

export default useDataState;