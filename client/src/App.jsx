import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faPlusSquare, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
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
import UserProfile from './containers/UserProfile/UserProfile';
import EditProfile from './containers/EditProfile/EditProfile';
import UserStatistics from './containers/UserStatistics/UserStatistics';
import UserPasswordChange from './containers/UserPasswordChange/UserPasswordChange';
import Document from './containers/Document/Document';
import UserProducts from './containers/UserProducts/UserProducts';
import AddProduct from './containers/AddProduct/AddProduct';
import EditProduct from './containers/EditProduct/EditProduct';

// Actions
import * as actions from './store/actions/index';

library.add( 
  faCalendarAlt,
  faCheckSquare,
  faCheckCircle,
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
      routes = (
        <Switch>
          <Route path="/" exact render={() => (
            this.props.isAuthenticated ? (
              <ListContainer listType="foodnotes" /> 
            ) : (
              <Home signUp={true} />
            )
          )}/>
          <ProtectedRoute path="/foodnotes/today" exact component={ListContainer} listType="foodnotes" auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/foodnotes/yesterday" exact component={ListContainer} listType="foodnotes" subType="yesterday" auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/foodnotes/:day(\d+)" exact component={ListContainer} listType="foodnotes" subType="otherday" auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/myfoods" exact component={ListContainer} listType="products" subType="currentuser" auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/latest" exact component={ListContainer} listType="products" subType="latest" auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/category/:categorySlug" exact component={ListContainer} listType="products" auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/profile" exact component={UserProfile} auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/profile/edit" exact component={EditProfile} auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/profile/statistics" exact component={UserStatistics} auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/profile/changepassword" exact component={UserPasswordChange} auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/products" exact component={UserProducts} auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/products/new" exact component={AddProduct} auth={this.props.isAuthenticated} />
          <ProtectedRoute path="/products/:productId(\d+)/edit" exact component={EditProduct} auth={this.props.isAuthenticated} />

          <Route path="/doc/:documentSlug" exact component={Document} />
          <Route path="/login" exact render={() => <Home signUp={false} isAuthenticated={this.props.isAuthenticated} />} />
          <Route path="/register" exact render={() => <Home signUp={true} isAuthenticated={this.props.isAuthenticated} />} />
          <Route path="/logout" exact component={Logout} isAuthenticated={this.props.isAuthenticated} />
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