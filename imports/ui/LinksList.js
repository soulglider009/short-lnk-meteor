import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {Links} from '../api/links';
import {Session} from 'meteor/session';
import FlipMove from 'react-flip-move';

import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      links: [],
      showHidden: false,
    };
  }

  // like beginplay().
  //Tracker Autorun is like running an event tick
  componentDidMount(){
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links});
    });
  }

  // like beingDestroyed()
  componentWillUnmount(){
    this.linksTracker.stop();
  }

  renderLinksList(){
    if(this.state.links.length === 0){
      return (
        <div className="item">
          <p className="item__status-message">Nothing here to see</p>
        </div>
      );
    }else{
      return this.state.links.map((link, index) => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        //return <p key={link._id}>{link.url}</p>
      });
    }
  }

  render(){
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksList()}
        </FlipMove>
      </div>
    );
  }
};
