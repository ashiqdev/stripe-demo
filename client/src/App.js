import React from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Vip from './components/Vip';
import Subscribe from './components/Subscription';
import SignOut from './components/SignOut';
import NavBar from './components/Navbar';
import ChangeCard from './components/ChangeCard';

function App() {
  return (
    <main className='container'>

        <NavBar/>

        <Switch>


          <Route path='/signin' component={Login} />
          <Route path='/signup' component={Register} />
          <Route path='/signout' component={SignOut} />
          <Route path='/subscribe' component={Subscribe} />
          <Route path='/changecard' component={ChangeCard} />
          <Route exact path='/' component={Home} />
          {/* <Route
            exact
            path='/'
            render={Routerprops => <Home {...Routerprops} />}
          /> */}
        </Switch>

    </main>
  );
}

export default App;
