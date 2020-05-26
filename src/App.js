import React from 'react';
import { Home,Navbar,India,About,GlobalMap } from './components';
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {

  render()
  { 
    return(
      <div>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/India" component={India}/>
          <Route path="/About" component={About}/>
          <Route path='/WorldMap' component={GlobalMap}/>
        </Switch>
      </div>
      )
  }
}

export default App;