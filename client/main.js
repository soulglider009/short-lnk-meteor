//Necessary third party imports
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';

//my imports
import {routes, onAuthChange} from '../imports/routes/routes';

//schema onfig
import '../imports/startup/simple-schema-config.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

//Wait for meteor to startup before actually rendering anything
Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, app);
});
