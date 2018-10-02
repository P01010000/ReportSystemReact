import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import immutable from 'immutable';
import { ModeSwitch } from 'chayns-components';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App';
import rootReducer from './reducers';
import SERVER_URL from './constants/server-url';
import { loadBoardSettings } from './actions/fetchBoardSettings';
import { loadData } from './actions/fetchData';
import { Login, RegisterLoginCallback } from './helper/login';
import { toggleAccordion, toggleReport } from './actions/accordionControl';

/**
 * The function waits till the chayns api is successfully loaded and
 * every additional functionality of it is ready to go,
 * renders the App component then
 * and finally initializes the ModeSwitch.
 * @return {Promise.<void>}
 */
async function init() {
    // eslint-disable-next-line no-console
    console.debug('ServerUrl for current environment:', SERVER_URL);

    if (__DEV__ || __STAGING__) {
        // eslint-disable-next-line global-require
        const installDevTools = require('immutable-devtools');
        installDevTools(immutable);
    }

    const storeMiddleware = [thunk];

    if (__DEV__ || __STAGING__) {
        // eslint-disable-next-line global-require
        storeMiddleware.push(require('redux-logger').default);
    }

    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...storeMiddleware))
    );

    await chayns.ready;
    chayns.register({ apiDialogs: true });
    await Login();

    const tappElement = document.querySelector('.tapp');
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>
        , tappElement
        );

    ModeSwitch.init({
        groups: [{
            id: 1,
            uacIds: [1],
            name: 'Admin'
        }]
    });

    RegisterLoginCallback(() => store.dispatch(loadData()));
    // dispatch async example action
    store.dispatch(loadBoardSettings());
    store.dispatch(loadData());
    if (chayns.env.parameters.show) {
      store.dispatch(toggleAccordion({ accordion: chayns.env.parameters.show }));
      store.dispatch(toggleReport({
        accordion: chayns.env.parameters.show,
        reportId: Number.parseInt(chayns.env.parameters.id, 10)
      }));
    }
}

init();
