import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Document.css';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import NoMatch from '../../components/Error/NoMatch';

class Document extends Component {

  componentDidMount() {
    const { documentSlug } = this.props.match.params;
    this.props.fetchDocument(documentSlug);
  }

  componentDidUpdate(prevProps) {
    const { documentSlug } = this.props.match.params;
    if(documentSlug !== prevProps.match.params.documentSlug){
      this.props.fetchDocument(documentSlug);
    }
  }

  componentWillUnmount() {
    this.props.onDocumentLeft();
  }

  renderDocument = ({title, content}) => {
    return (
      <React.Fragment>
        <h1>{title}</h1>
        <div className={styles['document__content']} dangerouslySetInnerHTML={{__html: content}}></div>
      </React.Fragment>
    )
  }

  render(){
    let document = <Spinner />;
    
    if(!this.props.loading && this.props.document !== null){
      document = this.renderDocument(this.props.document);
    } else if(this.props.error !== null) {
      document = <NoMatch />;
    }

    return(
      <section className={styles['document']}>
        <div className={styles['document__wrapper']}>
          {document}
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    document: state.document.document,
    loading: state.document.loading,
    error: state.document.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDocument: (slug) => dispatch(actions.fetchDocument(slug)),
    onDocumentLeft: () => dispatch(actions.resetDocumentReducerState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Document);