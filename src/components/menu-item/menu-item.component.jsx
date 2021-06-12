import React from "react";
import { withRouter } from "react-router";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, history, match, linkUrl }) => {
  return (
    <div
      className={`menu-item ${size}`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
      /* /somematchedURL/linkURL */
    >
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

/* withRouter is a higher order component — it’s essentially a function that takes a component as an argument and returns a modified component.
We pass the child component who wants to leverage the Route props that are only passed to the parent component.
I this case we're passing the "MenuItem" component, so that ut leverage the props paased to its parent "Homepage" component by React-Router-DOM in App.js */
export default withRouter(MenuItem);
