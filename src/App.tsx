import React, { FC, useState } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';

const App: FC = () => {
  const [flag, setFlag] = useState<any>(false)
  return (
    <div className="App">
      <AppRouter flag={flag} setFlag={setFlag}/>
    </div>
  );
}

export default App;
