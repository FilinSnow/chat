import { useEffect, useState } from "react";
import { useSelector, RootStateOrAny } from 'react-redux';
import axios from "axios";
import './SidePanel.scss';
import { Dialog } from "./components/Dialog";
import { Input } from "./components/Input";

interface IElement {
  id: number; 
  image: string; 
  name: string; 
  shortDescription: string
}

export const SidePanel = () => {
  const [ elements, setElements ] = useState([]) as any;
  const [ filtering, setFiltering ] = useState('all');
  const theme = useSelector((state: RootStateOrAny) => state.theme.theme);

  useEffect(() => {
    const getWars = async () => {
      try {
        await axios.get('https://react-test-starwars.vercel.app/api/products').then(resp => {
          setElements(resp.data.data);
        });
      } catch (e) {
        console.error(e);
      }
    }
    getWars();
  }, []);

  const filteringElements = (array: Array<IElement>) => {
    if (filtering === 'private') return array.filter((item) => item.name === 'Cara Dune');
    if (filtering === 'groups') return array.filter((item) => item.name === 'Rey Skywalker');
    return array;
  }

  return (
    <div className="side-panel" style={theme === 'dark' ? { background: '#222222', color: '#fff' } : {}}>
      <Input />
      <div className="header-panel">
        <div
          onClick={() => setFiltering('all')}
          style={{ background: filtering === 'all' ? '#056FFF' : '' }}
        >
          <img src={`https://react-test-starwars.vercel.app${elements[0]?.image}`} alt="Avatar" />
          <p>All</p>
        </div>
        <div
          onClick={() => setFiltering('private')}
          style={{ background: filtering === 'private' ? '#056FFF' : '' }}
        >
          <img src={`https://react-test-starwars.vercel.app${elements[1]?.image}`} alt="Avatar" />
          <p>Private</p>
        </div>
        <div
          onClick={() => setFiltering('groups')}
          style={{ background: filtering === 'groups' ? '#056FFF' : '' }}
        >
          <img src={`https://react-test-starwars.vercel.app${elements[2]?.image}`} alt="Avatar" />
          <p>Groups</p>
        </div>
      </div>
      <div className="list-of-chats">
        {
          filteringElements(elements).map((item: { id: number; image: string; name: string; shortDescription: string }) => {
            const { id, image, name, shortDescription } = item;
            return <Dialog key={id} id={id} image={image} name={name} shortDescription={shortDescription} />;
          })
        }
      </div>
    </div>
  )
}