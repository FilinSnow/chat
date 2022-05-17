import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import './App.css';
import AppRouter from './components/AppRouter';

const App: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootStateOrAny) => state.theme.theme);
  const [flag, setFlag] = useState<boolean>(false);
  
  useEffect(() => {
    const LS = localStorage.getItem('theme');
    if (!LS) {
      localStorage.setItem('theme', 'white');
      dispatch({
        type: 'CHANGE_THEME',
        payload: 'white'
      });
    }
  });

  return (
    <div className="App" style={{
      background: theme === 'black' ? '#1F2023' : '',
      height: '100vh',
      width: '100vw',
      scrollbarColor: '#1F2023'
    }}>
      <AppRouter flag={flag} setFlag={setFlag} />
    </div>
  );
}

export default App;
