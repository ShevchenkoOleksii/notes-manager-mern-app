import React from "react";
import 'materialize-css';
import './App.css';
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import NavBar from "./components/NavBar";
import {Loader} from "./components/Loader";
import {HeadTags} from './helpers/HeadTags';

function App() {
  const {token, userId, login, logout, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, ready
    }}>
      <BrowserRouter>
        {isAuthenticated && <NavBar />}
        <div className="container">
            <HeadTags
            title={'some app title'}
            metaDescription={'meta app description'}
          ></HeadTags>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
