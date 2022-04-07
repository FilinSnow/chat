import { IAuth } from '../../interfaces/auth';
import './Header.scss';

const ToggleThemeBtn = ({theme, setTheme}: IAuth) => {

  const toggleTheme = () => {
    const newTheme = theme === 'default' ? 'modern' : 'default';
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme);
  };

  return (
    <input
      onClick={() => toggleTheme()}
      className="apple-switch" 
      type="checkbox"
      checked={theme === 'modern'}
    >
        
    </input>
  )
}

export default ToggleThemeBtn;