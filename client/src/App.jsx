import React, { Component } from 'react';
import { 
  Route, 
  Switch, 
  withRouter
} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import NoMatch from './components/Error/NoMatch';
import ArticleList from './containers/ArticleList/ArticleList';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/articles" exact component={ArticleList} />
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