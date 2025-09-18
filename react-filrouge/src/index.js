import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';

// Routes
import RoutesConfig from './routes';

const App = createRoot(document.getElementById('app'));

App.render(
  <RoutesConfig />
);
