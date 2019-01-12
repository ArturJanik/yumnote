import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';

import Layout from './hoc/Layout/Layout';

import NoMatch from './components/Error/NoMatch';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Spinner from './components/UI/Spinner/Spinner';

import Auth from './containers/Auth/Auth';

import ArticleList from './containers/ArticleList/ArticleList';
import Article from './containers/Article/Article';
import AddArticle from './containers/AddArticle/AddArticle';
import EditArticle from './containers/EditArticle/EditArticle';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

library.add( 
  faCalendarAlt,
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
        <Route path="/login" exact render={() => <Auth signUp={false} />} />
        <Route path="/register" exact render={() => <Auth signUp={true} />} />
        <Route path="/logout" component={Logout} />

        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/:articleId(\d+)" exact component={Article} />
        <ProtectedRoute path="/articles/:articleId(\d+)/edit" exact component={EditArticle} auth={this.props.isAuthenticated} />
        <ProtectedRoute path="/articles/new" exact component={AddArticle} auth={this.props.isAuthenticated} />
        <Route path="/" exact component={ArticleList} />
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
    isAuthenticated: state.auth.token !== null,
    authenticationCheckFinished: state.auth.authCheckFinished,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));