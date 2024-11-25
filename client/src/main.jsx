import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './AppRoutes.jsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
