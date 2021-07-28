import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './App'
import Signin from './pages/auth/Signin'
import SigninUsername from './pages/auth/SigninWithUsername'
import CostumerAdd from './pages/CostumerAdd'
import CostumerList from './pages/CostumerList'
import CostumerDetail from './pages/CostumerDetail'
import ProductAdd from './pages/ProductAdd'
import ProductList from './pages/ProductList'
import MakePay from './pages/MakePay'
import NotFound from './pages/NotFound'

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={ App }/>
                <Route path="/signin" exact component={ Signin }/>
                <Route path="/signin/with-username" exact component={ SigninUsername }/>
                <Route path="/costumer-add" exact component={ CostumerAdd }/>
                <Route path="/costumer-list" exact component={ CostumerList }/>
                <Route path="/costumer/:id" exact component={ CostumerDetail }/>
                <Route path="/costumer/make-pay/:id" exact component={ MakePay }/>
                <Route path="/product-add" exact component={ ProductAdd }/>
                <Route path="/product-list" exact component={ ProductList }/>
                <Route path="*" exact component={ NotFound }/>
            </Switch>
        </Router>
    );
}

export default Routes;