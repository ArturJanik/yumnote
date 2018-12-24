import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  withRouter
} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import Layout from './hoc/Layout/Layout';
import NoMatch from './components/Error/NoMatch';
import ArticleList from './containers/ArticleList/ArticleList';
import Article from './containers/Article/Article';
import AddArticle from './containers/AddArticle/AddArticle';
import EditArticle from './containers/EditArticle/EditArticle';

library.add( 
  faCalendarAlt,
);

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/:articleId(\d+)" exact component={Article} />
        <Route path="/articles/:articleId(\d+)/edit" exact component={EditArticle} />
        <Route path="/articles/new" exact component={AddArticle} />
        <Route path="/" exact component={ArticleList} />
        <Route component={NoMatch} />
      </Switch>
    )

    return (
      <React.Fragment>
        <Layout>
          {routes}
        </Layout>
      </React.Fragment>
    );
  }
}

export default withRouter(App);