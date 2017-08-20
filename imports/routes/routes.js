//Necessary imports
import React from 'react';
import {Router, Route, Switch} from 'react-router';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

//Other Third party API section

// My Components
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

//Router configuration

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isAuthenticated && isUnauthenticatedPage){
    history.replace('/links');
  } else if(!isAuthenticated && isAuthenticatedPage){
    history.replace('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/links" component={Link} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
