import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './store';
import {Provider} from 'react-redux';
import {BrowserRouter} from "react-router-dom";

// Урок 9
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
/*   // <React.StrictMode>
*/
