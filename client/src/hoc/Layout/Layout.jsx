import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header
          isAuth={this.props.isAuthenticated} 
          currentUser={this.props.currentUserName} 
        />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    currentUserName: state.auth.currentUser
  }
}

export default connect(mapStateToProps)(Layout);