import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { CSSTransitionGroup } from 'react-transition-group'
import { Provider } from 'react-redux'
import store from './parts/store'

import './css/app.css';
import Main from './pages/main'
import Add from './pages/add'
import Edit from './pages/edit'

const history = createHistory()


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router history={history}>
          <div className="appContainer">
          <div className="nav">
          </div>
            <Route render={({ location }) => (
              <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}>
                <Route location={location} key={location.key}>
                  <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/add" component={Add} />
                    <Route path="/edit" component={Edit} />
                  </Switch>
                </Route>
              </CSSTransitionGroup>
              )}
            />
          </div>
        </Router>
      </Provider>
    )
  }
}


export default App
