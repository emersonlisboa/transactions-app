import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import Container from '@material-ui/core/Container';

import CssBaseline from '@material-ui/core/CssBaseline';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="lg">
      <CssBaseline />
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
