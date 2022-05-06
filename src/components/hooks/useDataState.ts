import { useCallback, useRef, useState } from "react";
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

  const sendMessage = useCallback(async () => {
    const regular = /^[а-яА-Яa-zA-Z0-9\s()*_\-+!?=#:;@$%^&*,."'\][]*$/;
    const regularEmoji =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;

    setDelay(true)
    setCounterMessage((prevState) => prevState + 1)
    setValue("");
    if (!localStorage.getItem("theme"))
      localStorage.setItem("theme", "default");

    if ((!regular.test(value) && !regularEmoji.test(value)) || !value.trim()) {
      return;
    }

    if (user) {
      console.log(222)
      if (!blockSend) {
        console.log(3333)
        setMoveScroll(true); // при добавлении своего сообщения скролл перемещается вниз
        handleAddMessage(value)
      }
    }
  }, [value]);

  return {
    value, setValue, messageRef,
    scrollRef, moveScroll, setMoveScroll,
    filteredMessages, delay, setDelay,
    counterMessage, setCounterMessage,
    blockSend, setBlockSend, oldDays,
    sendMessage
  }
}

export default useDataState;