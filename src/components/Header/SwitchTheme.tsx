import { IAuth } from '../../interfaces/auth';
import './Header.scss';

const ToggleThemeBtn = ({theme, setTheme}: IAuth) => {

  const toggleTheme = () => {
    setTheme(theme === 'default' ? 'modern' : 'default')
  };

  return (
    <input
      onClick={() => toggleTheme()}
      className="apple-switch" 
      type="checkbox"
    >
        
    </input>
  )
}

export default ToggleThemeBtn;