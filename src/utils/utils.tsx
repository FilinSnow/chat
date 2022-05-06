import moment from "moment";
import { TMessage } from "./types/types";

export const createBigMessages = (messages: Array<TMessage>) => {
  const allMessages: Array<Array<TMessage>> = [];
  console.log("allMessages=", messages)
  let EMAIL = messages.length !== 0 && messages[0].user.email;

  messages.forEach((message: TMessage, index) => {
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

export const findArrayOldFirstDates = (messages: Array<TMessage>) => {
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