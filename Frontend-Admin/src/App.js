import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

import { baselightTheme } from "./theme/DefaultColors";
import { useReducer } from 'react';
import INIT_STATE from './store/intiState';
import reducer from './store/reducer';
import { UserProvider } from './store/context';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  const localState = localStorage.getItem("state")?JSON.parse(localStorage.getItem("state")):INIT_STATE;
  // const [cart,setCart] = useState(localCart);
  const [state,dispatch] = useReducer(reducer,localState);
  const styles = {
    backgroundImage:"url(https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921)",
    width:"100%",
    height:"100%",
    position:"fixed",
    top:0,
    left:0,
    backgroundColor:"#000000",
    opacity:0.8,
    zIndex:100,
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center center",
    display: state.isLoading?"block":"none"
  }
  return (
    <UserProvider value={{state,dispatch}}>
      <ThemeProvider theme={theme}>
        <div id='loading' style={styles}></div>
        <CssBaseline />
        {routing}
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
