/* eslint-disable */
import React from "react";

// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import DvrIcon from '@material-ui/icons/Dvr';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
import { getJSDocEnumTag } from "typescript";
import Header from "./Header";

const useStyles = makeStyles(styles);

function Login(props) {
  const authedUser = props.authedUser;
  if (authedUser) {
    return (
      <Link
        to='/logout'
        className={props.classes.dropdownLink}
      >
        <ExitToAppIcon className={props.classes.dropdownIcons} /> Logout
      </Link>
    )
  }
  return (
    <Link
      to='/login'
      className={props.classes.dropdownLink}
    >
      <ExitToAppIcon className={props.classes.dropdownIcons} /> Login
    </Link>
  )
}
function Signup(props) {
  const authedUser = props.authedUser;
  if (authedUser) {
    return (
      <p></p>
    )
  }
  return (
    <Link
      to='/signup'
      className={props.classes.dropdownLink}
    >
      <ExitToAppIcon className={props.classes.dropdownIcons} /> Signup
    </Link>
  )
}

function NewQuestion(props) {
  const authedUser = props.authedUser;
  if (authedUser) {
    return (
      <Link
        to='/add'
        className={props.classes.dropdownLink}
      >
        <AddIcon className={props.classes.dropdownIcons} /> New Question
      </Link>
    )
  }
  return (
    <p></p>
  )
}

function Profile(props) {
  const authedUser = props.authedUser;
  if (authedUser) {
    return (
      <Link
        to='/profile'
        className={props.classes.dropdownLink}
      >
        <AccountCircleIcon className={props.classes.dropdownIcons} /> Profile
      </Link>
    )
  }
  return (
    <p></p>
  )
}

function Leaderboard(props) {
  const authedUser = props.authedUser;
  if (authedUser) {
    return (
      <Link
        to='/leaderboard'
        className={props.classes.dropdownLink}
      >
        <DvrIcon className={props.classes.dropdownIcons} /> Leaderboard
      </Link>
    )
  }
  return (
    <p></p>
  )
}

export default function HeaderLinks(props) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { dropdownHoverColor } = props.dropdownHoverColor;
  const classes = useStyles();

  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem >
        <Link
          to='/'
          className={classes.dropdownLink}
        >
          <HomeIcon className={classes.dropdownIcons} /> Home
          </Link>
        <NewQuestion authedUser={props.authedUser} classes={classes} />
        <Leaderboard authedUser={props.authedUser} classes={classes} />
        <Profile authedUser={props.authedUser} classes={classes} />
        <Login authedUser={props.authedUser} classes={classes} />
        <Signup authedUser={props.authedUser} classes={classes} />
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
