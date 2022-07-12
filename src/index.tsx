import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </HashRouter>
  </Provider>,
);
