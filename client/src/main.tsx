import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './AppRoutes.tsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const root = document.getElementById('root') as HTMLDivElement;

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
