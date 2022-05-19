import { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import './App.css';
import AppRouter from './components/AppRouter';

const App: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootStateOrAny) => state.theme.theme);
  const [flag, setFlag] = useState<boolean>(false);
  
  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
      dispatch({
        type: 'CHANGE_THEME',
        payload: 'light'
      });
    }
  });

  return (
    <div className="App" style={{
      background: theme === 'dark' ? '#1F2023' : '',
      height: '100vh',
      width: '100vw',
      scrollbarColor: '#1F2023'
    }}>
      <AppRouter flag={flag} setFlag={setFlag} />
    </div>
  );
}

export default App;
