import './App.css';
import { Link } from 'react-router-dom'
import { authenticate, isAuth } from './pages/auth/Helpers';

function App() {
  return (
    <div>
      { isAuth() ? "Home" :  null}
    </div>
  );
}

export default App;
