/* global Meteor */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Fa from 'react-fa';

class Home extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="jumbotron">
            <h1>Hello workd !</h1>
            <p>
              <Link to="/sign-in">
                  <Fa name="user" /> Connexion
              </Link>
              &nbsp;
              <Link to="/sign-up">
                  <Fa name="key" /> Créer votre compte
              </Link>
            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
