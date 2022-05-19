import { useSelector, RootStateOrAny } from "react-redux";
import "./Dialog.scss";

interface IDialog {
  id: number;
  image: string;
  name: string;
  shortDescription: string;
}

const clipMessage = (message: string) => {
  if (message.length > 70){
     return message.substring(0, 70) + '...' 
  } 

  return message
}

export const Dialog = ({ id, image, name, shortDescription }: IDialog) => {
  const theme = useSelector((state: RootStateOrAny) => state.theme.theme);

  return (
    <div className="dialog" style={{ background: theme === 'dark' ? '#424242' : '' }}>
      <div className="img">
        <img src={`https://react-test-starwars.vercel.app${image}`} alt="Avatar" />
      </div>
      <div className="container">
        <div className="text">
          <h5>{name}</h5>
          <p>09:41</p>
        </div>
        <div className="time">
          <p>{clipMessage(shortDescription)}</p>
        </div>
      </div>
    </div>
  );
}