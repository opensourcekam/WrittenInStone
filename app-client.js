// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var APP = require('./views/components/APP.js');
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router'

// github.com/reactjs/react-router-tutorial/tree/master/lessons/02-rendering-a-route
import Audience from './views/components/Audience'
import Board from './views/components/Board'
import Speaker from './views/components/Speaker'

// github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md#using-custom-histories
import { createHashHistory } from 'history'
// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })


// 22 - 26 github.com/reactjs/react-router-tutorial/tree/master/lessons/04-nested-routes
ReactDOM.render(
  (
    <Router history={appHistory}>
      <Route path="/" component={APP}>
        <IndexRoute component={Audience}/>
        {/*<Route path="/Audience" component={Audience}/>*/}
        <Route path="/Board" component={Board}/>
        <Route path="/Speaker" component={Speaker}/>
      </Route>
    </Router>
  )
  , document.getElementById('app'));
