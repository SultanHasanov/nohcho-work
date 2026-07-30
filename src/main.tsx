import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App';
import { rootStore } from '@/stores/root';
import { StoresProvider } from '@/stores/StoresProvider';
import '@/styles/theme.css';

void rootStore.session.restore();

const container = document.getElementById('root');
if (!container) {
  throw new Error('Не найден корневой элемент #root');
}

createRoot(container).render(
  <StrictMode>
    <StoresProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoresProvider>
  </StrictMode>,
);
