import React from 'react';
import SimpleAppBar from './components/DenseAppBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SimpleTable from './components/SimpleTable'


function App() {
  return (
    <Router>

      <div className="App">
        <div className="container">
          <SimpleAppBar />
          <Switch>
            <Route exact path={['/', '/transaction']} component={SimpleTable} />
            <Route path="/grade/:id" component={SimpleAppBar} />
          </Switch>
        </div>
      </div >
    </Router>
  );
}

export default App;
