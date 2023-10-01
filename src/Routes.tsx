import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ListOfProductsPage } from "./pages/ListOfProductsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminPage } from "./pages/AdminPage";
import React, { createContext, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { AboutUsPage } from "./pages/AboutUsPage";

export const UserContext = createContext<LoggedUser | null>(null);

export interface LoggedUser {
  isAdmin: boolean;
  firstName: String;
  address: String;
}

export const MainRoutes = () => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);

  return (
    <UserContext.Provider value={loggedUser}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ListOfProductsPage />} />
          <Route path="/admin" element={<AdminPage />} />

          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSucces={(user: LoggedUser | null) => {
                  setLoggedUser(user);
                }}
              />
            }
          />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};
