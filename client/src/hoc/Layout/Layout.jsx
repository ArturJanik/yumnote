import React, { PureComponent } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Layout extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}
export default Layout;