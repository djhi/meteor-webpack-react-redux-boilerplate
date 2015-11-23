/* global Meteor, Roles */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import '../styles/main.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    title: 'Ma nutrition',
  }

  componentDidMount() {
    // this.props.loadUser();
  }

  onAlertDismiss() {
    // this.props.clearNotification();
  }

  render() {
    const { children, loggingIn, user } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 main-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
