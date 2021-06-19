import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './App'
import Signin from './pages/auth/Signin'
import SigninUsername from './pages/auth/SigninWithUsername'
import SigninPhone from './pages/auth/SigninWithPhone'
import VerifyAccount from './pages/auth/VerifyAccount'
import NotFound from './pages/NotFound'

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={ App }/>
                <Route path="/signin" exact component={ Signin }/>
                <Route path="/signin/with-username" exact component={ SigninUsername }/>
                <Route path="/signin/with-phone" exact component={ SigninPhone }/>
                <Route path="/signin/verify-account/:token" exact component={ VerifyAccount }/>
                <Route path="*" exact component={ NotFound }/>
            </Switch>
        </Router>
    );
}

export default Routes;