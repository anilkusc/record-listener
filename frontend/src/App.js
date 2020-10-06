import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  isLoggedIn: false};
    this.handleSetLoggedIn = this.handleSetLoggedIn.bind(this);
  }
  handleSetLoggedIn() {
    this.setState({ isLoggedIn: true });
  }
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {/*<Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />*/}
              <PrivateRoute handleSetLoggedIn ={this.handleSetLoggedIn} isLoggedIn={this.state.isLoggedIn}/>
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}
class PrivateRoute extends React.Component {
   
  
  render() {
        return  this.props.isLoggedIn ? (<Route path="/" name="Home" render={props => <TheLayout {...props}/>} />) : 
        (<Route path="/" name="Login Page" render={props => <Login handleSetLoggedIn={this.props.handleSetLoggedIn}  {...props}/>} />);
      
  }
}
export default App;
