import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Feature from './components/Feature';
import { verify } from './actions/index';

const store = createStore(
    reducers,
    applyMiddleware(reduxThunk)
);

const token = localStorage.getItem('token');

if (token) {
    const obj = {jwt: token};
    store.dispatch(verify(obj));
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Welcome} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/feature" exact component={Feature} />
                <Route path="/signout" exact component={Signout} />
                <Route path="/signin" exact component={Signin} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
)
