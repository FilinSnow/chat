
import React, { useEffect, useState } from 'react';
import _ from 'underscore';
import './topUsers.scss';

interface IntMessage {
  uid: string,
  displayName: string,
  text: string
}

interface IntTopUsers {
  name: any, 
  count: any
}

const TopUsers = ({ messages } : any) => {
  const [topUsers, setTopUsers] = useState<any>([]);

  const createTop = () => {
    const messagesGroup = _.groupBy(messages, (message: any) => { return message.uid; });
    const items = [] as any;

    for (let key in messagesGroup) {
      items.push({
        name: messagesGroup[key][0].displayName,
        count: messagesGroup[key].length
      });
    }
    
    setTopUsers(items.slice(0, 10)); //return top-10 users
  }

  useEffect(() => {
    createTop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  console.log(topUsers)
  
  return (
    <div className='top-user-container'>
      <h4>Топ пользователей</h4>
      <ol className='user-list'>
        {topUsers.map((user: IntTopUsers) => {
          return <li>{user.name} ({user.count})</li>
        })}
      </ol>
    </div>

  );
}

export default TopUsers;