////////////////////////////////////////////////////////////////////
// Libs
import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

// Components
import Layout from './hoc/Layout/Layout';

import NoMatch from './components/Error/NoMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Spinner from './components/UI/Spinner/Spinner';

import Home from './containers/Home/Home';
import Logout from './containers/Home/Logout/Logout';
import ListContainer from './containers/ListContainer/ListContainer';
// import Article from './containers/Article/Article';
// import AddArticle from './containers/AddArticle/AddArticle';
// import EditArticle from './containers/EditArticle/EditArticle';

// Actions
import * as actions from './store/actions/index';
//
////////////////////////////////////////////////////////////////////

library.add( 
  faCalendarAlt,
  faCheckSquare,
  faFacebook,
  faTwitter,
  faTumblr,
);

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact render={() => this.props.isAuthenticated ? <ListContainer listType="foodnotes" /> : <Home signUp={true} /> } />
        <Route path="/login" exact render={() => <Home signUp={false} />} />
        <Route path="/register" exact render={() => <Home signUp={true} />} />
        <ProtectedRoute path="/logout" exact component={Logout} auth={this.props.isAuthenticated} />
        {/* 
        <ProtectedRoute path="/today" exact render={() => <ListContainer listType="foodnotes" />} auth={this.props.isAuthenticated} />
        <ProtectedRoute path="/myproducts" exact render={() => <ListContainer listType="userProducts" />} auth={this.props.isAuthenticated} />

        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/:articleId(\d+)" exact component={Article} />
        <ProtectedRoute path="/articles/:articleId(\d+)/edit" exact component={EditArticle} auth={this.props.isAuthenticated} />
        <ProtectedRoute path="/articles/new" exact component={AddArticle} auth={this.props.isAuthenticated} />
        <Route path="/" exact component={ArticleList} /> */}
        <Route component={NoMatch} />
      </Switch>
    )

    if(!this.props.authenticationCheckFinished) {
      routes = <Spinner />;
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
    authenticationCheckFinished: state.auth.authCheckFinished,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));