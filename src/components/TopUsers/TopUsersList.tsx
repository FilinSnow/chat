
import React, { useEffect, useState } from 'react';
import _ from 'underscore';
import './topUsers.scss';

interface IntTopUsers {
  name: any, 
  count: any
}

const TopUsers = ({ messages } : any) => {
  const [topUsers, setTopUsers] = useState<any>([]);

  const createTop = () => {
    const messagesGroup = _.groupBy(messages, (message: any) => { return message.email; });
    const items = [] as any;

    for (let key in messagesGroup) {
      items.push({
        name: messagesGroup[key][0].displayName,
        count: messagesGroup[key].length
      });
    }

    items.sort((item : any, nextItem: any) => item.count - nextItem.count);
    const sortedList = _.sortBy(items, 'count').reverse().slice(0, 10);

    if (sortedList.length) {
      if (sortedList[0]) sortedList[0].name = "👑 " + sortedList[0].name;
      if (sortedList[1]) sortedList[1].name = "😎 " + sortedList[1].name;
      if (sortedList[2]) sortedList[2].name = "🤠 " + sortedList[2].name;
    }

    setTopUsers(sortedList); //return top-10 users
  }

  useEffect(() => {
    createTop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  
  return (
    <div className='spacing-container'>
      <div className='list-container'>
        <h4>Топ пользователей</h4>
        <ol className='list'>
          {topUsers.map((user: IntTopUsers, i: number) => {
            return <li key={`top-${i}`}>{user.name} ({user.count})</li>
          })}
        </ol>
      </div>
      <div className='list-container'>
        <h4>Голосовые команды</h4>
        <ol className='list'>
          <li>!sound</li>
          <li>!anime</li>
          <li>!secret</li>
          <li>!news</li>
          {/* <li>!🇺🇦</li> */}
        </ol>
      </div>
    </div>

  );
}

export default TopUsers;