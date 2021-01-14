/* eslint-disable */
import React from "react";
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

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
  //const user = useSelector((state) => state.projects)


  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem >
          <Link
            to='/dashboard'
            className={classes.dropdownLink}
          >
            <HomeIcon className={classes.dropdownIcons} /> Home
          </Link>
          <Link
            to='/add'
            className={classes.dropdownLink}
          >
            <AddIcon className={classes.dropdownIcons} /> New Question
          </Link>
          <Link
            to='/leaderboard'
            className={classes.dropdownLink}
          >
            <DvrIcon className={classes.dropdownIcons} /> Leaderboard
          </Link>
          <Link
            to='/profile'
            className={classes.dropdownLink}
          >
            <AccountCircleIcon className={classes.dropdownIcons} /> Profile
          </Link>
          <Link
            to='/logout'
            className={classes.dropdownLink}
          >
            <ExitToAppIcon className={classes.dropdownIcons} /> Logout
          </Link>
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
