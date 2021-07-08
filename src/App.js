import './App.css';
import { isAuth } from './pages/auth/Helpers';
import Home from './pages/Home'
function App() {
  return (
    <div>
      { isAuth() ? <Home/> :  null}
    </div>
  );
}

export default App;
