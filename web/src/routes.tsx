import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import DatePlacesMap from './pages/DatePlacesMap'
import Place from './pages/Place'
import CreatePlace from './pages/CreatePlace'

const Routes = () =>{
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>   
                <Route path="/app" exact component={DatePlacesMap}/>   
                <Route path="/place/create" exact component={CreatePlace}/>   
                <Route path="/place/:id" exact component={Place}/>   
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
