import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios'
import './App.css';


import { userSignup, userLogin } from './services/api-helper'

import AgeGate from './pages/AgeGate';
import Landing from './pages/Landing';
import User from './pages/User';
import Whiskey from './pages/Whiskey';
import Home from './pages/Home';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'login',
      loginFormData: {
        username: '',
        password: '',
      },
      registerFormData: {
        username: '',
        email: '',
        password: '',
      }
    }
  }


  // SB - Handle Register Form Change
  handleRegisterFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  // SB - Registration Submit

  handleRegisterSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const user = await userSignup(this.state.registerFormData);
      console.log(user);
      this.setState({
        registerForm: {
          username: '',
          password: '',
          email: ''
        },
        currentUser: user,
        currentView: 'landing'
      });
      this.props.history.push('/landing')
    } catch (e) {
      console.log(e)
    }
  }

  //SB - Handle Login Change

  handleLoginFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value,
      },
    }));
  }


  // SB - Handle Login Submit


  handleLoginSubmit = async (ev) => {
    try {
      ev.preventDefault();
      const user = await userLogin(this.state.loginFormData);
      console.log(user);
      this.setState({
        loginFormData: {
          username: '',
          password: '',
        },
        currentUser: user,
        currentView: 'landing'
      });
      this.props.history.push('/landing')
    } catch (e) {
      console.log(e)
    }
  }


  async componentDidMount() {
    const data = await axios.get('http://localhost:3000/users');
    console.log(data);
  }


  render() {
    return (

      <>
        <Switch>
          <Route exact path="/" component={AgeGate} />
          <Route path="/home" render={() => (
            <Home
              currentView={this.state.currentView}
              registerForm={this.state.registerFormData}
              handleRegisterSubmit={this.handleRegisterSubmit}
              handleRegisterFormChange={this.handleRegisterFormChange}

              loginForm={this.state.loginFormData}
              handleLoginSubmit={this.handleLoginSubmit}
              handleLoginFormChange={this.handleLoginFormChange}
            />

          )} />
          <Route path="/landing" component={Landing} />
          <Route path="/whiskey/:id" render={(props) => (
            <Whiskey
              id={props.match.params.id} />
          )} />
          <Route path="/user" render={() => (
            <User
              currentUser={{
                id: 1,
                username: "john",
                email: "john@email.com"
              }}
            />
          )} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
