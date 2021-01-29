/*eslint-disable*/
import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import LockIcon from '@material-ui/icons/Lock';

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.js";
import { getUsers, addUser } from '../utils/api'

import firebase, { auth, provider } from '../utils/firebase'

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(signupPageStyle);

export default function SignUpPage({ ...rest }) {
  const [checked, setChecked] = React.useState([1]);
  const [email, setEmail] = React.useState('Email');
  const [password, setPassword] = React.useState('Password');
  const [displayName, setDisplayName] = React.useState('DisplayName');
  const [name, setName] = React.useState('Name');
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleChange = (e, option) => {
    const text = e.target.value

    if (option === 'email') {
      setEmail(text);
    } else if (option === 'password') {
      setPassword(text);
    } else if (option === 'displayName') {
      setDisplayName(text);
    } else if (option === 'name') {
      setName(text);
    }
  }
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const signUp = () => {
    auth.createUserWithEmailAndPassword(email, password).then((user) => {
      const { dispatch } = this.props
      dispatch(setAuthedUser(email));

      user = {email, name, displayName}
      addUser(user).then( (users) => {
        dispatch(receiveUsers(users));
      })
      
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  const classes = useStyles();
  return (
    <div>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={10}>
            <Card className={classes.cardSignup}>
              <h2 className={classes.cardTitle}>Register</h2>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={5} md={5}>
                    <form className={classes.form}>
                      <div>
                        <input
                          placeholder="Email"
                          value={email}
                          onChange={(e) => handleChange(e, 'email')}
                          className='textarea'
                          maxLength={280}
                        />
                      </div>
                      <div>
                        <input
                          placeholder="Name"
                          value={name}
                          onChange={(e) => handleChange(e, 'name')}
                          className='textarea'
                          maxLength={280}
                        />
                      </div>
                      <div>
                        <input
                          placeholder="Display Name"
                          value={displayName}
                          onChange={(e) => handleChange(e, 'displayName')}
                          className='textarea'
                          maxLength={280}
                        />
                      </div>
                      <div>
                        <input
                          placeholder="Password"
                          value={password}
                          onChange={(e) => handleChange(e, 'password')}
                          className='textarea'
                          maxLength={280}
                        />
                      </div>
                      <FormControlLabel
                        classes={{
                          label: classes.label
                        }}
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot
                            }}
                            checked={checked.indexOf(1) !== -1 ? true : false}
                          />
                        }
                        label={
                          <span>
                            I agree to the{" "}
                            <a href="#pablo">terms and conditions</a>.
                            </span>
                        }
                      />
                      <div className={classes.textCenter}>
                        <Button round color="primary" onClick={(e) => signUp()}>
                          Get started
                          </Button>
                      </div>
                    </form>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
