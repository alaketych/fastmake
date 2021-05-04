import React, { useState, useEffect } from 'react';
import { userSetUserRole, userAuthSuccess } from './redux/actions';
import { Header, Footer } from "./components/_index"
import { Dashboard } from "./pages/admin/_index"
import { Home, ItemPage, CatalogPage, ProductPage, ProductsCategoryPage, Login, Registration, Cart } from "./pages/_index";
import { AdminCategory, AdminProducts, AdminUsers } from './components/AdminPanell/cells';
import { AdminPage } from './pages/admin/_index';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
        dispatch(userSetUserRole(role));
        dispatch(userAuthSuccess(token))
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>

        <Header />

          <Switch>
            <Route path="/" component={ Home } exact />
            <Route path="/catalog" component={ CatalogPage } exact />
            <Route path="/products" component={ ProductPage } exact />
            <Route path="/products/:id" component={ ItemPage } exact />
            <Route path="/products/category/:id" component={ ProductsCategoryPage } exact />

            <Route path="/cart" component={ Cart } exact />
            <Route path="/login" component={ Login } exact />
            <Route path="/registration" component={ Registration } exact />

            <Route path="/manager" component={ AdminPage } exact/>
            <Route path="/admin-category" component={AdminCategory}/>
            <Route path="/admin-products" component={AdminProducts}/>
            <Route path="/admin-users" component={AdminUsers}/>

            <Route path="/dashboard" component={ Dashboard } exact />
          </Switch>

        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App
