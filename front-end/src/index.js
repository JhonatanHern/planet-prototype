import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import "./css/index.css";
import * as serviceWorker from "./serviceWorker";

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'
import App from "./App";

const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
)

serviceWorker.unregister();
