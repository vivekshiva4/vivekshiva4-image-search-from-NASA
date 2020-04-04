import React from "react"
import {
    Router,
    Route,
    IndexRoute
} from 'react-router'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import ImageSearch from "./components/ImageSearchFromNASA.jsx"

ReactDOM.render((
    <Router history={browserHistory}>
        <div>
            <Route exact path="/" component={ImageSearch}/>
        </div>
    </Router>
), document.getElementById("root"))
