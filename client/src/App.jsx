import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  withRouter,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faPlusSquare, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCalendarAlt, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

// Components
import Layout from './hoc/Layout/Layout';

import NoMatch from './components/Error/NoMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Spinner from './components/UI/Spinner/Spinner';

import Home from './containers/Home/Home';
import Logout from './containers/Home/Logout/Logout';
import ListContainer from './containers/ListContainer/ListContainer';
import AccountConfirmation from './containers/AccountConfirmation/AccountConfirmation';

import UserProfile from './containers/UserProfile/UserProfile';
import EditProfile from './containers/EditProfile/EditProfile';
import UserStatistics from './containers/UserStatistics/UserStatistics';

import Document from './containers/Document/Document';

import UserProducts from './containers/UserProducts/UserProducts';
import AddProduct from './containers/AddProduct/AddProduct';
import EditProduct from './containers/EditProduct/EditProduct';

import PasswordReset from './containers/Password/PasswordReset/PasswordReset';
import PasswordForgot from './containers/Password/PasswordForgot/PasswordForgot';
import PasswordChange from './containers/Password/PasswordChange/PasswordChange';

// Actions
import * as actions from './store/actions/index';

library.add( 
  faCalendarAlt,
  faCheckSquare,
  faCheckCircle,
  faTimesCircle,
  faFacebook,
  faTwitter,
  faTumblr,
  faPlusSquare,
  faTrash,
  faSpinner,
);

class App extends Component {

  componentDidMount() {
    this.props.tryAutoLogin();
  }

  render() {
    let routes = <Spinner />;

    if(this.props.authCheckFinished) {
      const renderHome = () => (
        this.props.isAuthenticated ? (
          <Redirect to="/foodnotes/today" />
        ) : (
          <Home signUp={true} />
        )
      )
      routes = (
        <Switch>
          <Route path="/" exact render={renderHome}/>
          <ProtectedRoute path="/foodnotes/today" exact component={ListContainer} listType="foodnotes" />
          <ProtectedRoute path="/foodnotes/yesterday" exact component={ListContainer} listType="foodnotes" subType="yesterday" />
          <ProtectedRoute path="/foodnotes/:day(\d+)" exact component={ListContainer} listType="foodnotes" subType="otherday" />
          <ProtectedRoute path="/myfoods" exact component={ListContainer} listType="products" subType="currentuser" />
          <ProtectedRoute path="/latest" exact component={ListContainer} listType="products" subType="latest" />
          <ProtectedRoute path="/category/:categorySlug" exact component={ListContainer} listType="products" />
          <ProtectedRoute path="/profile" exact component={UserProfile} />
          <ProtectedRoute path="/profile/edit" exact component={EditProfile} />
          <ProtectedRoute path="/profile/statistics" exact component={UserStatistics} />
          <ProtectedRoute path="/profile/update-password" exact component={PasswordChange} />
          <ProtectedRoute path="/products" exact component={UserProducts} />
          <ProtectedRoute path="/products/new" exact component={AddProduct} />
          <ProtectedRoute path="/products/:productId(\d+)/edit" exact component={EditProduct} />

          <Route path="/doc/:documentSlug" exact component={Document} />
          <Route path="/login" exact render={() => <Home signUp={false} isAuthenticated={this.props.isAuthenticated} />} />
          <Route path="/register" exact render={() => <Home signUp={true} isAuthenticated={this.props.isAuthenticated} />} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/reset-password" exact component={PasswordForgot} isAuthenticated={this.props.isAuthenticated} />
          <Route path="/reset-password/:token" exact component={PasswordReset} isAuthenticated={this.props.isAuthenticated} />
          <Route path="/confirm-account/:token" exact component={AccountConfirmation} type="confirmation" />
          <Route path="/report-fraudulent-account/:token" exact component={AccountConfirmation} type="report" />
          <Route component={NoMatch} />
        </Switch>
      )
    }

    return (
      <React.Fragment>
        <Layout>
          {routes}
        </Layout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null && state.auth.currentUser !== null,
    authCheckFinished: state.auth.authCheckFinished,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoLogin: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));