import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import '../styles/main.scss';

const Root = ({ store }) => (
    <Provider {...{store}}>
        <ReduxRouter />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;
