import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './store';
import {Provider} from 'react-redux';
import {BrowserRouter, HashRouter} from "react-router-dom";

// Урок 9
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
/*   // <React.StrictMode>
*/
