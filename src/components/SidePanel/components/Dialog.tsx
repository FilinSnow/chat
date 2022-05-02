import "./Dialog.scss";

interface IDialog {
  id: number;
  image: string;
  name: string;
  shortDescription: string;
}

export const Dialog = ({ id, image, name, shortDescription }: IDialog) => {
  return (
    <div className="dialog">
      <div className="img">
        <img src={`https://react-test-starwars.vercel.app${image}`} />
      </div>
      <div className="container">
        <div className="text">
          <h5>{name}</h5>
          <p>09:41</p>
        </div>
        <div className="time">
          <p>{shortDescription}</p>
        </div>
      </div>
    </div>
  );
}