/* global Accounts, Meteor */
import React from 'react';
import { render } from 'react-dom';
import Root from './client/containers/Root';
import configureStore from './client/store';
import moment from 'moment';

const store = configureStore();

Meteor.startup(() => {
    moment.locale('fr');

    render(
        <Root {...{store}} />,
        document.getElementById('root')
    );
});
