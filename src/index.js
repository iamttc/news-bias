import './index.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/app/App';
import searchApp from './reducers/Reducers';
// import Action from './actions/Actions';

import injectTapEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

var defaultState = {
    name: ''
}
let store = createStore(searchApp, defaultState);

injectTapEventPlugin();
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
